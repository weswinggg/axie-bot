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

    const walletSchema = require("../models/walletSchema");

    let myWallet;
    try{
      myWallet = await walletSchema.findOne({ id: message.author.id });
      if(!myWallet) {

        let wallet = await walletSchema.create({
          id: message.author.id,
          address: ""
        })

        if(wallet) wallet.save();
      }
    } catch(err) {
      console.log(err);
      if(!res) return message.channel.send("Something went wrong");
    }

    if(args[0] === "set") {
      if(!args[1]) return message.reply(`Provide ronin address.\n${prefix}wallet set [address]`);
      if(!args[1].startsWith('ronin:')) return message.reply('Invalid ronin address.');

      const res = await walletSchema.findOneAndUpdate({
        id: message.author.id,
      }, {
        address: args[1]
      }).catch(
        err => console.log(err)
      );

      if(!res) return message.channel.send("Something went wrong");
      return message.reply("Ronin wallet saved!");
    }

    if(myWallet.address.length === 0) return message.reply(`You have no record!\n${prefix}wallet set [address]`);

    // return the saved address
    else if(args[0] === "get") {
      return message.reply("Here's your ronin wallet:\n" + myWallet.address);
    }

    // provide claimable and unclaimable(in game) SLP
    else if (args[0] === "slp") {
      const fetch = require('node-fetch');

      ethAddress = myWallet.address.replace("ronin:", "0x");

      // fetch slp record from the api
      let data = await fetch(`https://game-api.skymavis.com/game-api/clients/${ethAddress}/items/1`).then(response => response.json());
      
      let msg = `\nClaimable: ${data.claimable_total} SLP`;
      msg += `\nIn Game: ${data.total} SLP`;

      return message.reply(msg);
    }
  }
}