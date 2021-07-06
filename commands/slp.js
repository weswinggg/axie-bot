module.exports = {
  name: 'slp',
  aliases: ['slp'],
  description: "SLP rewards",
  execute(message, args, Discord, prefix) {
    if(!args[0]) return message.reply(`SLP commands\n${prefix}slp [arena/pvp]\n${prefix}slp [adventure/pve]`);

    // provide info for arena/adventure slp reward per stage/mmr
    if(args[0] === "arena" || args[0] === "pvp") {
     return message.channel
     .send({ files: 
      ['https://scontent.fmnl17-2.fna.fbcdn.net/v/t1.6435-9/201990356_1311363319258192_7701678902344888749_n.png?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=85S0tDgjMTAAX83Ov2f&_nc_ht=scontent.fmnl17-2.fna&oh=00db0c43418444746ead295ee8c83205&oe=60E47A7F'] });
    }

    else if(args[0] === "adventure" || args[0] === "pve") {
      return message.channel
      .send({ files: 
        ['https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.6435-9/193013249_1311363322591525_2002849367408842054_n.png?_nc_cat=108&ccb=1-3&_nc_sid=730e14&_nc_ohc=avGuoYSVb9QAX_xHbCc&_nc_ht=scontent.fmnl17-1.fna&oh=ae46e6631792c8a3b1e47069c77e8407&oe=60E4AF2C']});
      }
  }
}