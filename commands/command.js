module.exports = {
  name: 'commands',
  aliases: ['help', 'commands'],
  description: 'List of commands',
  execute(message, args, Discord, commands) {

    const newEmbed = new Discord.MessageEmbed()
      .setColor('#40777C')
      .setTitle('Commnads')
      .addFields(commands)
      .setFooter('You may use -suggest to update/add a command')

    message.channel.send(newEmbed);
  }
}