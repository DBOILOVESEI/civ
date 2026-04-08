import { Message, Client } from "discord.js";

export const execute = async(client, readyClient) => {
  const channel = client.channels.cache.get("1020304614228234252");
  channel.send("Hello");
};
