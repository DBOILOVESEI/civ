import * as dotenv from "dotenv"; dotenv.config();

import { REST, Routes, Collection } from "discord.js";
import { readdirSync, existsSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import utils from "./utils/init.ts";

import CLIENT_CONFIG from "../../../config.json" with { type:"json" };
import config from "./config.json" with { type:"json" };

// CONFIG
const token = process.env.TOKEN;
const rest = new REST().setToken(token);

// MAIN
const CommandsManager = {}
CommandsManager.Commands = [];

CommandsManager.Init = async (client) => {
  client.Commands = new Collection();

  const commandsPath = join(import.meta.dirname, config.COMMANDS_PATH);
  const commands_list = readdirSync(commandsPath);

  for (const commandName of commands_list) {
    const commandPath = join(commandsPath, commandName);
    const initPath = join(commandPath, config.INIT_FILE);

    const commandURL = pathToFileURL(initPath).href;
    const command = (await import(commandURL)).default;
    
    const commandBuilt = CommandsManager.BuildCommand(command);
    if (commandBuilt === false) { continue; };
    
    // Load subcommands 
    const subcommandsPath = join(commandPath, config.SUBCOMMANDS_PATH);
    if (existsSync(subcommandsPath) === true) {
      if (!command.Subcommands) {
        command.Subcommands = {};
      };

      const subcommands = readdirSync(subcommandsPath);

      for (const subcommandName of subcommands) {
        const subcommandInitURL = pathToFileURL(join(subcommandsPath, subcommandName, config.INIT_FILE)).href;
        const subcommand = (await import(subcommandInitURL)).default;
        
        const subcommandBuilt = CommandsManager.BuildCommand(subcommand);
        if (subcommandBuilt === false) { continue; };

        command.Builder.addSubcommand(subcommand.Builder);

        command.Subcommands[subcommand.Name] = subcommand;
      };

    };

    // Store in module
    CommandsManager.Commands.push(command.Builder.toJSON());

    // Store in client
    client.Commands.set(command.Name, command);

  };

  await CommandsManager.RegisterCommands();

  // Other modules
  utils.Init(client);
};

CommandsManager.BuildCommand = async (command, commandName) => {
  if (!("Name" in command) || !("Description" in command) || !("Builder" in command) || !("Execute" in command)) {
      console.log(`[WANRING] Command ${commandName} is missing Builder or Execute field.`);
      return false;
  };

  command.Builder.setName(command.Name);
  command.Builder.setDescription(command.Description);

  const options = command.Options;
  if (options) {
    for (const option of options) {
      if (!("Type" in option) || !("Name" in option) || !("Description" in option)) {
        console.log(`${option} missing required Type or Name or Description`);
        continue;
      };

      const methodName = `add${option.Type}Option`;

      if (typeof command.Builder[methodName] !== "function") {
        console.log(`Invalid method ${methodName} detected for Command Option ${option.Name}`);
        continue;
      };

      command.Builder[methodName](optionBuilder => optionBuilder
        .setName(option.Name)
        .setDescription(option.Description)
        .setRequired(option.Required ?? false)
      );
    };
  };

  return true;
};

CommandsManager.RegisterCommands = async () => {
  if (CommandsManager.Commands.length < 1) {
    console.log("There are no commands loaded.");
    return;
  }

  try {
    const commands_data = rest.put(
      Routes.applicationGuildCommands(
        CLIENT_CONFIG.CLIENT_ID,
        CLIENT_CONFIG.SERVER_ID),
      { body: CommandsManager.Commands}
    );
    console.log(`Successfully refreshed (/) commands.`)

  } catch (error) {
    console.log("Error registering commands: ", error);

  };
};

export default CommandsManager;
