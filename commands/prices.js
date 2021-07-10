module.exports = {
  name: 'price',
  aliases: ['price'],
  description: "ETH/AXS/SLP current price",
  async execute(message, args, Discord, prefix) {
    const slp = "smooth-love-potion";
    const eth = "ethereum";
    const axs = "axie-infinity";
    const dpet = "my-defi-pet";
    const currency = "php";
    const fetch = require('node-fetch');

    let price;
    // return current prices for ETH SLP AXS
    if(!args[0]) {
      let prices = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${eth},${slp},${axs},${dpet}$&vs_currencies=${currency}`).then(response => response.json());

      let msg = `1 ETH= ${prices[eth][currency]} ${currency.toUpperCase()}\n`;
      msg += `1 AXS = ${prices[axs][currency]} ${currency.toUpperCase()}\n`;
      msg += `1 SLP = ${prices[slp][currency]} ${currency.toUpperCase()}`;
      msg += `1 DPET = ${prices[dpet][currency]} ${currency.toUpperCase()}`;
      return message.channel.send(msg);
    }

    // return SLP price
    else if(args[0] === "slp") {
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${slp}&vs_currencies=${currency}`).then(response => response.json()).then(data => {
        price = data[slp][currency];
      });
    }

    // return ETH price
    else if(args[0] === "eth") {
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${eth}&vs_currencies=${currency}`).then(response => response.json()).then(data => {
        price = data[eth][currency];
      });
    }

    // return AXS price
    else if(args[0] === "axs") {
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${axs}&vs_currencies=${currency}`).then(response => response.json()).then(data => {
        price = data[axs][currency];
      });
    }

    else if(args[0] === "dpet") {
      await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${dpet}&vs_currencies=${currency}`).then(response => response.json()).then(data => {
        price = data[axs][currency];
      });
    }

    else return;

    return message.channel.send(`1 ${args[0].toUpperCase()} = ${price} ${currency.toUpperCase()}`);;
  }
}