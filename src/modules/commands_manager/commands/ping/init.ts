import { SlashCommandBuilder } from "discord.js";

const Command = {};
Command.Name = "ping";
Command.Description = "Replies with pong.";

Command.Data = new SlashCommandBuilder();
Command.Data.setName(Command.Name);
Command.Data.setDescription(Command.Description);

Command.Execute = async (interaction) => {
  console.log("[PONG!]")
  await interaction.reply("Pong!");
};

export default Command;
