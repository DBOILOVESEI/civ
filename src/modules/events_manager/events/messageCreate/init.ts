import { Message, Client } from "discord.js";

const Event = {};
Event.EventType = "messageCreate";

Event.Execute = async(client: Client, msg: Message) => {
  const author = msg.author;
  if (author.id === process.env.CLIENT_ID) { return; };
};

export default Event;
