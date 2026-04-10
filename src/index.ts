import { config } from "dotenv"

import { readdirSync } from "fs"
import { join } from "path"
import ModulesLoader from "./modules/modules_loader/init.ts"
import { Client, Events, GatewayIntentBits } from "discord.js"

config();

const token = process.env.TOKEN;

const client = new Client({ intents: [
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.Guilds,
]});

async function main() {
  try {
    await client.login(token);
    console.log("Login successful.")
  } catch (error) {
    console.log("Failed to login: ", error)
  };

  await ModulesLoader.Init(client);
};

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

main();
