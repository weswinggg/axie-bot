module.exports = {
  name: 'multiaccount',
  aliases: ['ma', 'multiaccount'],
  description: 'shows bannable scenario for multiaccount',
  execute(message, args, Discord, prefix) {    
    // provide info about multi-accounting 
    const newEmbed = new Discord.MessageEmbed()
      .setColor('#C01025')
      .setTitle('Multi-accounting')
      .setURL('https://axietree.gitbook.io/axietree/faq-1/faq#what-happens-if-the-borrower-engages-in-activity-that-would-get-the-axie-banned')
      .setDescription('“We regularly ban players who break our terms of use https://axieinfinity.com/terms, and for avoidance of doubt : you may only play on one account within any 24-hour period.”')
      .setImage('https://cdn.discordapp.com/attachments/761188777816883200/860514252183044096/attach.png')

    message.channel.send(newEmbed);
  }
}