import * as dotenv from "dotenv"
dotenv.config();

import { readdirSync } from "fs"
import { join } from "path"
import ModulesLoader from "./modules/modules_loader/init.ts"
import { Client, Events, GatewayIntentBits } from "discord.js"

const token = process.env.TOKEN;

const client = new Client({ intents: [
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.Guilds,
]});

async function main() {
  await ModulesLoader.Init();

  client.login(token);
};

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

main()

// MODULES
const eventsPath = join(import.meta.dirname, "events");
const eventFolders = readdirSync(eventsPath);

for (const event of eventFolders) {
  // Get event functions
  const eventPath = join(eventsPath, event);
  const eventFiles = readdirSync(eventPath);

  client.on(event, async(...args) => {
      for (const eventFunc of eventFiles) {
        const funcPath = join(eventPath, eventFunc)

        const module = await import (`file://${funcPath}`);
        try {
          await module.execute(client, ...args);
        } catch (error) {
            console.error(`Error executing ${eventFunc} for event ${event} in ${eventPath}.`)
      };
    };
  });
};
