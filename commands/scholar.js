module.exports = {
  name: 'scholar',
  aliases: ['scholar'],
  description: 'Scholar wallet details',
  async execute(message, args, Discord, prefix) {
    // provide infographic for class advantage
    if(!args[0]) return message
    .reply('\scholar commands\n' + 
          `${prefix}scholar add [address] [name optional]\n`+
          `${prefix}scholar remove [address/name]\n` +
          `${prefix}scholar slp\n`);

    const fs = require("fs");
    scholars = JSON.parse(fs.readFileSync('./JSONFiles/scholar.json', "utf8"));

    var manager = scholars.find(s => s.id === message.author.id);

    if(args[0] === "add") {

      if(!args[1]) return message.reply(`Provide ronin address.\n${prefix}scholar add [address] [name optional]`);
      if(!args[1].startsWith('ronin:')) return message.reply('Invalid ronin address.');
      
      var scholarName = "";

      if(args[2]) scholarName = args[2];
      else {
        scholarName = args[1].substring(6, 10) + "..." 
                    + args[1].substring(args[1].length - 4, args[1].length)
      }

      var scholar = {name: scholarName, address: args[1]}

      if(!manager)
        scholars.push({id: message.author.id, scholars: [scholar]});
      else
      {
        if(manager.scholars.find(s => s.address === args[1])) return message.reply("Scholar already exists!");
        manager.scholars.push(scholar);
      }

      // save the json file changes
      fs.writeFile("./JSONFiles/scholar.json", JSON.stringify(scholars), err => {
        if(err) console.log(err)
      });

      return message.reply("Scholar record saved!");
    }

    if(args[0] === "remove") {
      if(!manager) return message.reply('No existing scholars to remove.');
      if(!args[1]) return message.reply(`Provide ronin address/name.\n${prefix}scholar remove [address/name]`);
    
      const wallet = manager.scholars.find(s => s.address === args[1] || s.name === args[1]);

      if(!wallet) return message.reply(`${args[1]} doesn't exist`);
      manager.scholars = manager.scholars.filter(s => s !== wallet);

      fs.writeFile("./JSONFiles/scholar.json", JSON.stringify(scholars), err => {
        if(err) console.log(err)
      });

      return message.reply('Scholar removed');
    }

    if(args[0] === "slp") {
      const fetch = require('node-fetch');

      var embed = new Discord.MessageEmbed()

      for(const scholar of manager.scholars) {
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