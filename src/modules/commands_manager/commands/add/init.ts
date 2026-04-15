import { SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import config from "../../config.json" with { type:"json" };

// MAIN
const Command = {};
Command.Name = "add";
Command.Description = "Add a new Point Of Interest";
Command.Builder = new SlashCommandBuilder();

Command.Execute = async (interaction) => {
  await interaction.reply("Man stfu");
};

export default Command;
