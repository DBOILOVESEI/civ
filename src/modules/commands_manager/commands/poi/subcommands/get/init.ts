import { SlashCommandSubcommandBuilder } from "discord.js";
import DatabaseManager from "../../../../../database_manager/init.ts";

const Subcommand = {};
Subcommand.Name = "get";
Subcommand.Description = "Get 1 or all Points of Interest";
Subcommand.Builder = new SlashCommandSubcommandBuilder();

Subcommand.Execute = async (interaction) => {
  const all_poi = DatabaseManager.GetAllPOI();

  let message: string = "List of all Points of Interest:";
  let count = 0;
  message = message.concat("\n", "```lua");
  for (const poi of all_poi) {
    count += 1;
    message = message.concat("\n", `${count}. ${poi.name}`); 
  };
  message = message.concat("\n", "```");

  interaction.reply(message);
};

export default Subcommand;
