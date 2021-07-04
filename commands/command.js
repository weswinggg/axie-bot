module.exports = {
  name: 'commands',
  aliases: ['help', 'commands'],
  description: 'List of commands',
  execute(message, args, Discord, commands, prefix) {

    const newEmbed = new Discord.MessageEmbed()
      .setColor('#40777C')
      .setTitle('Commnads')
      .addFields(commands)
      .setFooter(`You may use ${prefix}suggest to suggest an update/new command`)

    message.channel.send(newEmbed);
  }
}