module.exports = {
  name: 'clear',
  description: 'Clear messages',
  aliases: ['clear'],
  async execute(message, args, Discord, prefix) {
    // just for clearing test commands
    let role = message.guild.roles.cache.find(r => r.name === "Mod");
    if (!message.member.roles.cache.has(role.id)) return message.reply('You need to be a Moderator to access this command');
    
    if (!args[0]) return message.reply("Enter a number 1-10\n-clear 1");
    if (isNaN(args[0])) return message.reply("Please enter a number");

    const maxDelete = 10;
    if (args[0] > maxDelete) return message.reply(`Please enter a number not greater than ${maxDelete}!`);
    if (args[0] < 1) return message.reply('You must delete at least one message!');

    await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
      message.channel.bulkDelete(messages);
    });
  }
}