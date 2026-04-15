import { SlashCommandBuilder } from "discord.js";

const Command = {};
Command.Name = "ping";
Command.Description = "Replies with pong.";
Command.Builder = new SlashCommandBuilder();

Command.Execute = async (interaction) => {
  await interaction.reply("Pong!");
};

export default Command;
