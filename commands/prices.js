module.exports = {
  name: 'price',
  aliases: ['price'],
  description: "ETH/AXS/SLP current price",
  async execute(message, args, Discord) {
    

    const slp = "smooth-love-potion";
    const eth = "ethereum";
    const axs = "axie-infinity";
    const currency = "php";
    const fetch = require('node-fetch');

    if(!args[0]) {
      let prices = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${eth},${slp},${axs},$&vs_currencies=${currency}`).then(response => response.json());

      let msg = `1 ${eth} = ${prices[eth][currency]} ${currency.toUpperCase()}\n`;
      msg += `1 ${axs} = ${prices[axs][currency]} ${currency.toUpperCase()}\n`;
      msg += `1 ${slp} = ${prices[slp][currency]} ${currency.toUpperCase()}`;
      message.channel.send(msg);
    }

    else if(args[0] === "slp") {
      let price;
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${slp}&vs_currencies=${currency}`).then(response => response.json()).then(data => {
        price = data[slp][currency];
      });

      message.channel.send(`1 ${args[0].toUpperCase()} = ${price} ${currency.toUpperCase()}`);
    }

    else if(args[0] === "eth") {
      let price;
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${eth}&vs_currencies=${currency}`).then(response => response.json()).then(data => {
        price = data[eth][currency];
      });

      message.channel.send(`1 ${args[0].toUpperCase()} = ${price} ${currency.toUpperCase()}`);
    }

    else if(args[0] === "axs") {
      let price;
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${axs}&vs_currencies=${currency}`).then(response => response.json()).then(data => {
        price = data[axs][currency];
      });

      message.channel.send(`1 ${args[0].toUpperCase()} = ${price} ${currency.toUpperCase()}`);
    }
  }
}