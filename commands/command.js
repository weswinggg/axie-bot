module.exports = {
  name: 'commands',
  aliases: ['help', 'commands'],
  description: 'List of commands',
  execute(message, args, Discord, commands, prefix) {
    // display the possible commands for this bot
    const newEmbed = new Discord.MessageEmbed()
      .setColor('#40777C')
      .setTitle('Commnads')
      .addFields(commands)

    message.channel.send(newEmbed);
  }
}