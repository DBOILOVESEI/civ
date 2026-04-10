import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import { Collection } from "discord.js";
import config from "./config.json" with { type:"json" };

// MAIN
const EventsManager = {};
EventsManager.Events = new Collection();

EventsManager.Init = async (client) => {
  console.log("Loading event...");

  const eventsPath = join(import.meta.dirname, config.EVENTS_PATH);
  const events_list = readdirSync(eventsPath);

  for (const eventName of events_list) {
    const eventURL = pathToFileURL(join(eventsPath, eventName, config.INIT_FILE)).href;

    const initFile = await import(eventURL);
    const event = initFile.default;
    
    if ("EventType" in event && "Execute" in event) {
      EventsManager.Events.set(eventName, event);
      
      client.on(event.EventType, async(...args) => {
        try {
          await event.Execute(client, ...args);

        } catch (error) {
          console.log(`Error executing event ${eventName}: `, error);

        };
      });

    } else {
      console.log(`[WANRING] Command ${eventName} at ${eventsPath} is missing EventType or Execute field.`);
    };
  };
};

export default EventsManager;
