import { config } from "dotenv";
import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import CLIENT_CONFIG from "../../../config.json" with { type:"json" };

// INITIAL SETUP
config();

// CONFIG
const token = process.env.TOKEN;
const rest = new REST().setToken(token);

// MAIN
const Commands = {}
Commands.Commands = [];

Commands.Init = async (client) => {
  console.log(client.user.tag)
};

Commands.RegisterCommands = async => {
  if (Commands.Commands.length < 1) {
    console.log("There are no commands loaded.");
    return;
  }

  try {
    console.log(`Refreshing ${Commands.Commands.length} (/) commands.`)

    const commands_data = rest.put(Routes.applicationGuildCommands(CLIENT_CONFIG.CLIENT_ID, CLIENT_CONFIG.SERVER_ID), { body: Commands.Commands} );

    console.log(`Successfully refreshed ${commands_data} (/) commands.`)

  } catch (error) {
    console.log("Error registering commands: ", error);

  };
};

export default Commands;
