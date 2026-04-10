import { Message, Client } from "discord.js";

const Event = {};
Event.EventType = "clientReady";

Event.Execute = async(client, readyClient) => {
  const channel = client.channels.cache.get("1020304614228234252");
  channel.send("Hello");
};

export default Event;
