module.exports = {
  name: 'wallet',
  aliases: ['wallet'],
  description: 'Save your ronin wallet address (starts w/ ronin:)',
  execute(message, args, Discord, prefix) {
    if(!args[0]) return message
    .reply('\nWallet commands\n' + 
          `${prefix}wallet set [address]\n`+
          `${prefix}wallet get\n`+
          `${prefix}wallet remove`);

    const fs = require("fs");
    wallet = JSON.parse(fs.readFileSync('./JSONFiles/wallets.json', "utf8"));

    if(args[0] === "set") {
      // guard
      if(!args[1]) return message.reply(`Provide ronin address.\n${prefix}wallet set [address]`);
      if(!args[1].startsWith('ronin:')) return message.reply('Invalid ronin address.');

      let myWallet = wallet.find(w => w.id === message.author.id);
      if(!myWallet) 
        wallet.push( {id: message.author.id, address: args[1]} );
      else
        myWallet.address = args[1];

      fs.writeFile("./JSONFiles/wallets.json", JSON.stringify(wallet), err => {
        if(err) console.log(err)
      });

      return message.reply("Ronin wallet saved!");
    }

    else if(args[0] === "get") {
      const myWallet = wallet.find(w => w.id === message.author.id);
      if(!myWallet) return message.reply(`You have no record!\n${prefix}wallet set [address]`);
      return message.reply("Here's your ronin wallet:\n" + myWallet.address);
    }

    else if(args[0] === "remove") {
      wallet = wallet.filter(w => w.id !== message.author.id);

      fs.writeFile("./JSONFiles/wallets.json", JSON.stringify(wallet), err => {
        if(err) console.log(err)
      });
      
      return message.reply("You're record was removed!");
    }
  }
}