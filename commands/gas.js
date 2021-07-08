module.exports = {
  name: 'gas',
  aliases: ['gas'],
  description: 'Provide estimated gas prices',
  async execute(message, args, Discord, prefix) {
    
    const fs = require("fs");
    gasPrices = JSON.parse(fs.readFileSync('./JSONFiles/gas.json', "utf8"));
    gasLimit = JSON.parse(fs.readFileSync('./JSONFiles/gaslimit.json', "utf8"));

    const giga = 1000000000;
    var currency = "eth";
    if(!args[0]) {
      var msg = 'Gas price commands\n';
      var embed = new Discord.MessageEmbed()
        .setTitle('Gas price commands');
        
      
      for(const gas of gasLimit) {
        embed
        .addField(`${prefix}gas ${gas.id}`, gas.desc);
      }

      return message.channel.send(embed);
    };

    var gas = gasLimit.find(u => u.id === args[0]);
    if(!gas) return;

    var currencyMultiplier;
    const fetch = require('node-fetch');
    if(args[1]) {
      currency = args[1];
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${args[1]}`).then(response => response.json()).then(data => {
        currencyMultiplier = data["ethereum"][args[1]];
      });
    }

    gas.prices = [];

    for(var spd in gasPrices)
    {
      if(spd === "timestamp") continue;

      var obj = {}
      if(currencyMultiplier)
      obj[spd] = (gasPrices[spd] / giga * gas.limit / giga * currencyMultiplier).toFixed(0);
      else
      {
        obj[spd] = (gasPrices[spd] / giga * gas.limit / giga).toFixed(5);
        currency = "ETH";
      }

      gas.prices.push(obj);
    }

    var embed = new Discord.MessageEmbed()
      .setTitle(`${gas.desc} Gas Price`)
      .setURL('https://www.gasnow.org/')
      
    for(const spd of gas.prices){
      for(var key in spd)
      {
        embed
          .addField(key, `${spd[key]} ${currency.toUpperCase()}`, true)
      }
    }

    return message.channel.send(embed);
  }
}