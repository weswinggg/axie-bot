module.exports = {
  name: 'scholar',
  aliases: ['scholar'],
  description: 'Scholar wallet details',
  async execute(message, args, Discord, prefix) {
    // provide infographic for class advantage
    if(!args[0]) return message
    .reply('\scholar commands\n' + 
          `${prefix}scholar set [address] [name optional]\n`+
          `${prefix}scholar remove [address/name]\n` +
          `${prefix}scholar slp\n`);

    const scholarSchema = require("../models/scholarSchema");

    if(args[0] === "set") {

      if(!args[1]) return message.reply(`Provide ronin address.\n${prefix}scholar add [address] [name optional]`);
      if(!args[1].startsWith('ronin:')) return message.reply('Invalid ronin address.');
      
      var scholarName = "";

      if(args[2]) scholarName = args[2];
      else {
        scholarName = args[1].substring(6, 10) + "..." 
                    + args[1].substring(args[1].length - 4, args[1].length)
      }

      let res = await scholarSchema.findOneAndUpdate({
        managerId: message.author.id,
        address: args[1]
      }, {
        name: scholarName
      }, {
        new: true,
        upsert: true
      }).catch(
        err => console.log(err)
      );

      if(!res) return message.channel.send("Something went wrong");

      res.save();
      return message.reply("Scholar record saved!");
    }

    if(args[0] === "remove") {
      if(!args[1]) return message.reply(`Provide ronin address/name.\n${prefix}scholar remove [address/name]`);
    
      let res = await scholarSchema.deleteOne({ 
        managerId: message.author.id,
        $or: [ {address: args[1]}, {name: args[1]} ]
      });

      return message.reply('Scholar removed');
    }

    if(args[0] === "slp") {
      const fetch = require('node-fetch');

      var embed = new Discord.MessageEmbed()

      let scholars = await scholarSchema.find({
        managerId: message.author.id
      })

      for(const scholar of scholars) {
        const ethAddress = scholar.address.replace("ronin:", "0x");
        const data = await fetch(`https://lunacia.skymavis.com/game-api/clients/${ethAddress}/items/1`).then(response => response.json());
        embed
          .addField(scholar.name, `${data.total} SLP`, true)
      }

      // TODO: add when is next possible claim date
      return message.reply(embed);
    }

  }
}