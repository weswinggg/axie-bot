module.exports = {
  name: 'rps',
  aliases: ['rps'],
  description: 'Rock Paper Scissors',
  execute(message, args, Discord, prefix) {
    // provide infographic for class advantage
    message.channel.send('https://media.discordapp.net/attachments/761188777816883200/860522391544791060/attach.png');
  }
}