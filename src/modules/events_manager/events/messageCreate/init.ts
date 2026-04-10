import { Message, Client } from "discord.js";

const Event = {};
Event.EventType = "messageCreate";

Event.Execute = async(client: Client, msg: Message) => {
  const author = msg.author;
  if (author.id === process.env.CLIENT_ID) { return; };
  if (author.id === "1180349272831557814") {
    msg.reply("Chud");
    return;
  }
  msg.reply("Does it squirt or does it cream?");
};

export default Event;
