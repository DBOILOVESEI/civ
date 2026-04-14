import { SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import config from "../../config.json" with { type:"json" };

// MAIN
const Command = {};
Command.Name = "add";
Command.Description = "Add a new Point Of Interest";

Command.Data = new SlashCommandBuilder();
Command.Data.setName(Command.Name);
Command.Data.setDescription(Command.Description);

Command.Init = async (client) => {
  const subcommandsPath = join(import.meta.dirname, config.SUBCOMMANDS_PATH);
  const subcommands = readdirSync(subcommandsPath);

  for (const commandFolder of subcommands) {
    const initURL = pathToFileURL(join(subcommandsPath, commandFolder, config.INIT_FILE)).href;
    const command = (await import(initURL)).default;
    
    if (!("Name" in command) || !("Description" in command)) {
      console.log("N word")
    };
  };
}

Command.Execute = async (interaction) => {
  await interaction.reply("Man stfu");
};

export default Command;
