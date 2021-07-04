module.exports = {
  name: 'wallet',
  aliases: ['wallet'],
  description: 'Save your ronin wallet address (starts w/ ronin:)',
  async execute(message, args, Discord, prefix) {
    if(!args[0]) return message
    .reply('\nWallet commands\n' + 
          `${prefix}wallet set [address]\n`+
          `${prefix}wallet get\n`+
          `${prefix}wallet remove\n` +
          `${prefix}wallet slp\n`);

    const fs = require("fs");
    wallet = JSON.parse(fs.readFileSync('./JSONFiles/wallets.json', "utf8"));

    const myWallet = wallet.find(w => w.id === message.author.id);

    if(args[0] === "set") {
      // guard
      if(!args[1]) return message.reply(`Provide ronin address.\n${prefix}wallet set [address]`);
      if(!args[1].startsWith('ronin:')) return message.reply('Invalid ronin address.');

      
      if(!myWallet) 
        wallet.push( {id: message.author.id, address: args[1]} );
      else
        myWallet.address = args[1];

      fs.writeFile("./JSONFiles/wallets.json", JSON.stringify(wallet), err => {
        if(err) console.log(err)
      });

      return message.reply("Ronin wallet saved!");
    }

    // wallet details
    if(!myWallet) return message.reply(`You have no record!\n${prefix}wallet set [address]`);

    else if(args[0] === "get") {
      return message.reply("Here's your ronin wallet:\n" + myWallet.address);
    }

    else if(args[0] === "remove") {
      wallet = wallet.filter(w => w.id !== message.author.id);

      fs.writeFile("./JSONFiles/wallets.json", JSON.stringify(wallet), err => {
        if(err) console.log(err)
      });
      
      return message.reply("You're record was removed!");
    }

    else if (args[0] === "slp") {
      const fetch = require('node-fetch');

      ethAddress = myWallet.address.replace("ronin:", "0x");
      if(args[0] === "slp") {
        let data = await fetch(`https://lunacia.skymavis.com/game-api/clients/${ethAddress}/items/1`).then(response => response.json());
  
        let msg = `\nClaimable: ${data.claimable_total} SLP`;
        msg += `\nIn Game: ${data.total} SLP`;
        return message.reply(msg);
      }
    }
  }
}