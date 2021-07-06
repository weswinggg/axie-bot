module.exports = {
  name: 'breed',
  description: 'Breeding info',
  aliases: ['breed'],
  execute(message, args, Discord, prefix) {
    // provide info for breeding
    const newEmbed = new Discord.MessageEmbed()
      .setColor('#40777C')
      .setTitle('Breeding Guide/Farm')
      .setURL('https://axie.substack.com/p/axie-breeding-guide')
      .setDescription('Atleast 3 Axies (not siblings) to breed indefinitely')
      .setImage('https://media.discordapp.net/attachments/761188777816883200/860515404870320128/attach.png?width=337&height=374')

    message.channel.send(newEmbed);
  }
}