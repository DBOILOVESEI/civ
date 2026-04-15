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
  const poi_name = interaction.options.getString("name");
  interaction.reply(`${poi_name} shall be created.`);
};

export default Subcommand;
