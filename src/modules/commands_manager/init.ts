import * as dotenv from "dotenv"; dotenv.config();

import { REST, Routes, Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
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
    const commandURL = pathToFileURL(join(commandsPath, commandName, config.INIT_FILE)).href;

    const initFile = await import(commandURL);
    const command = initFile.default;
    
    if (!("Data" in command) || !("Execute" in command)) {
      console.log(`[WANRING] Command ${commandName} at ${commandsPath} is missing Data or Execute field.`);
      continue;
    };
    
    // Optional Init command
    if ("Init" in command) {
      command.Init(client);
    };

    // Store in module
    CommandsManager.Commands.push(command.Data.toJSON());

    // Store in client
    client.Commands.set(command.Name, command);

  };

  await CommandsManager.RegisterCommands();
};

CommandsManager.RegisterCommands = async () => {
  if (CommandsManager.Commands.length < 1) {
    console.log("There are no commands loaded.");
    return;
  }

  try {
    console.log(`Refreshing ${CommandsManager.Commands.length} (/) commands.`)

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
