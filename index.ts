const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.Guilds
  GatewayIntentBits.MessageContent
]});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(token);
