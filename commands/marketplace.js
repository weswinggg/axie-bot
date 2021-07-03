module.exports = {
  name: 'marketplace',
  aliases: ['mp', 'marketplace'],
  description: "provide mp link",
  execute(message, args, Discord) {

    message.channel.send('https://marketplace.axieinfinity.com/axie');
  }
}