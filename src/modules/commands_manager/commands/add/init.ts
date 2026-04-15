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
Command.Subcommands = {};

Command.Execute = async (interaction) => {
  const subcommandName = interaction.options.getSubcommand();

  if (subcommandName) {
    const subcommand = Command.Subcommands[subcommandName];
    if (!subcommand) {
      console.log(`Subcommand ${subcommandName} is not loaded in ${Command.Name}.`);
      return;
    };

    if (!(subcommand.Execute)) {
      console.log(`Subcommand ${subcommandName} does not have Execute method.`);
      return;
    }

    subcommand.Execute(interaction);
    return;
  };

  await interaction.reply("Somewthing went wrong.");
};

export default Command;
