import { config } from "dotenv";
import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";

config();

// MAIN
const Commands = {}
Commands.Commands = [];

Commands.Init = async (client) => {
  console.log(client.user.tag)
};

Commands.RegisterCommands = async => {
  console.log("Registering commands go here.");
};

export default Commands;
