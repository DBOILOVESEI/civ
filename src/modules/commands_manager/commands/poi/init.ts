import { SlashCommandBuilder } from "discord.js";
import utils from "../../utils/init.ts";
import config from "../../config.json" with { type:"json" };

// MAIN
const Command = {};
Command.Name = "poi";
Command.Description = "Interact with Points of Action";
Command.Builder = new SlashCommandBuilder();
Command.Subcommands = {};

Command.Execute = async (interaction) => {
  const subcommandName = interaction.options.getSubcommand();

  if (subcommandName) {
    utils.ExecuteSubcommand(Command, interaction);
    return;
  };
};

export default Command;
