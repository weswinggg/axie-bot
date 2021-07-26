module.exports = {
  name: 'slp',
  aliases: ['slp'],
  description: "SLP rewards",
  execute(message, args, Discord, prefix) {
    if(!args[0]) return message.reply(`SLP commands\n${prefix}slp [arena/pvp]\n${prefix}slp [adventure/pve]`);

    // provide info for arena/adventure slp reward per stage/mmr
    if(args[0] === "arena" || args[0] === "pvp") {
      var msg = "";
      msg += "\n**Under 800** – No SLP gained";
      msg += "\n**800-999** – 1 SLP per win";
      msg += "\n**1000-1099** – 3 SLP per win";
      msg += "\n**1100-1299** – 7 SLP per win";
      msg += "\n**1300-1499** – 8 SLP per win";
      msg += "\n**1500-1799** – 9 SLP per win";
      msg += "\n**1800-1999** – 10 SLP per win";
      msg += "\n**2000-2199** – 11 SLP per win";
      msg += "\n**2200+** – 12 SLP per win";
      return message.channel
      .send(msg);
    }

    else if(args[0] === "adventure" || args[0] === "pve") {
      var msg = "";
      msg += "\n**Level 1-4**: 1 SLP per win";
      msg += "\n**Level 5-9**: 2 SLP per win";
      msg += "\n**Level 10-14**: 4 SLP per win";
      msg += "\n**Level 15-16**: 6 SLP per win";
      msg += "\n**Level 17-20**: Random between 6-10 SLP per win";
      msg += "\n**Level 21-36**: Random between 10-20 SLP per win";
      return message.channel
      .send(msg);
      }
  }
}