import { readdirSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";
import { Collection } from "discord.js";
import config from "./config.json" with { type:"json" };

// MAIN
const EventsManager = {};
EventsManager.Events = new Collection();

EventsManager.Init = async (client) => {

};

export default EventsManager;
