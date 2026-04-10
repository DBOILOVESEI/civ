const Event = {};
Event.EventType = "interactionCreate";

Event.Execute = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) { return; };
  
  console.log("Executing command.")

  const command = interaction.client.Commands.get(interaction.commandName);
  if (!command) {
    console.log(`[ERROR] Command ${interaction.commandName} does not exist.`);
    return;
  };

  
  try {
    await command.Execute(interaction);

  } catch (error) {
    console.log(`Error executing command: ${interaction.commandName}: `, error);

    if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				flags: MessageFlags.Ephemeral,
			});
		}
  };
};

export default Event;
