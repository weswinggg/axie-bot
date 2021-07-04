module.exports = {
  name: 'suggestion',
  aliases: ['suggest', 'suggestion'],
  permissions: [],
  description: 'creates a suggestion!',
  execute(message, args, Discord, prefix) {
    const suggestChannel = 'suggestions';
    const channel = message.guild.channels.cache.find(c => c.name === suggestChannel);

    // guard if
    if (!channel) return message.channel.send(`${suggestChannel} channel does not exist!`);

    if(!args[0]) return message.reply(`Provide your suggestion\n${prefix}suggest [suggestion]`);

    let messageArgs = args.join(' ');
    const embed = new Discord.MessageEmbed()
      .setColor('#06A256')
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(messageArgs);

    channel.send(embed).then(msg => {
      msg.react('👍');
      msg.react('👎');
      message.delete();
    }).catch(err => {
      throw err;
    });
  }
}