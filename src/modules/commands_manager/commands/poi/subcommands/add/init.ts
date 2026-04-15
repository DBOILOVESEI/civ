import { SlashCommandSubcommandBuilder } from "discord.js";
import DatabaseManager from "../../../../../database_manager/init.ts";

const Subcommand = {};
Subcommand.Name = "add";
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
  DatabaseManager.CreatePOI(poi_name);

  interaction.reply(`Created ${poi_name}.`);
};

export default Subcommand;
