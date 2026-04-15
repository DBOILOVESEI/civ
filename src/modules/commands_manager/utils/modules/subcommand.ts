const Util = {};

Util.ExecuteSubcommand = async (command, interaction) => {
  const subcommandName = interaction.options.getSubcommand();

  const subcommand = command.Subcommands[subcommandName];
  if (!subcommand) {
    console.log(`Subcommand ${subcommandName} is not loaded in ${command.Name}.`);
    return;
  };

  if (!(subcommand.Execute)) {
    console.log(`Subcommand ${subcommandName} does not have Execute method.`);
    return;
  }

  subcommand.Execute(interaction);
};

export default Util;
