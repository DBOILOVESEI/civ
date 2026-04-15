import { SlashCommandSubcommandBuilder } from "discord.js";

const Subcommand = {};
Subcommand.Name = "poi";
Subcommand.Description = "Add a new Point of Interest";
Subcommand.Builder = new SlashCommandSubcommandBuilder();
Subcommand.Options = [
  {
    Type: "String",
    Name: "name",
    Description: "Name of the Point of Interest",
    Required: true
  }
];

Subcommand.Execute = async (interaction) => {
  interaction.reply("This should add Point of Interest, but I haven't implemented it yet.")

};

export default Subcommand;
