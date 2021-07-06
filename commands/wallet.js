module.exports = {
  name: 'wallet',
  aliases: ['wallet'],
  description: 'Save your ronin wallet address (starts w/ ronin:)',
  async execute(message, args, Discord, prefix) {
    // provide list of possible commands
    if(!args[0]) return message
    .reply('\nWallet commands\n' + 
          `${prefix}wallet set [address]\n`+
          `${prefix}wallet get\n`+
          `${prefix}wallet remove\n` +
          `${prefix}wallet slp\n`);

    // get the json file for the wallets (ronin addresses for each user)
    const fs = require("fs");
    wallet = JSON.parse(fs.readFileSync('./JSONFiles/wallets.json', "utf8"));

    // check if user already has an address in json
    const myWallet = wallet.find(w => w.id === message.author.id);

    if(args[0] === "set") {
      // guard
      if(!args[1]) return message.reply(`Provide ronin address.\n${prefix}wallet set [address]`);
      if(!args[1].startsWith('ronin:')) return message.reply('Invalid ronin address.');

      // add the wallet to the json
      if(!myWallet) 
        wallet.push( {id: message.author.id, address: args[1]} );
      // update the wallet to the json
      else
        myWallet.address = args[1];

      // save the json file changes
      fs.writeFile("./JSONFiles/wallets.json", JSON.stringify(wallet), err => {
        if(err) console.log(err)
      });

      return message.reply("Ronin wallet saved!");
    }

    if(!myWallet) return message.reply(`You have no record!\n${prefix}wallet set [address]`);

    // return the saved address
    else if(args[0] === "get") {
      return message.reply("Here's your ronin wallet:\n" + myWallet.address);
    }

    // remove the saved address
    else if(args[0] === "remove") {
      wallet = wallet.filter(w => w.id !== message.author.id);

      // saved json changes
      fs.writeFile("./JSONFiles/wallets.json", JSON.stringify(wallet), err => {
        if(err) console.log(err)
      });
      
      return message.reply("You're record was removed!");
    }

    // provide claimable and unclaimable(in game) SLP
    else if (args[0] === "slp") {
      const fetch = require('node-fetch');

      ethAddress = myWallet.address.replace("ronin:", "0x");

      // fetch slp record from the api
      let data = await fetch(`https://lunacia.skymavis.com/game-api/clients/${ethAddress}/items/1`).then(response => response.json());

      let msg = `\nClaimable: ${data.claimable_total} SLP`;
      msg += `\nIn Game: ${data.total} SLP`;

      // TODO: add when is next possible claim date
      return message.reply(msg);
      
    }
  }
}