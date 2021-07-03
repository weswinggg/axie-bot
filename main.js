const Discord = require('discord.js');
const config = require('./JSONFiles/config.json');
// create bot
const client = new Discord.Client();

const prefix = '*';

// setup filesystem function
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

// get list of command files
let commandFields = [];
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);

  commandFields.push(parseField(command, prefix));
}

/*
To add new commands, create new JS file under commands/
set aliases for the possible commands (i.e -mp & -marketplace)
use this execute(message, args, Discord)
If need more parameters, add a new else if logic when checking the command variable below
*/

// when ready, execute console.log 
client.once('ready', () => {
  console.log('Axie Guru is now online')
});

// process messages
client.on('message', message => {
  // guard if
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // accept cmd like "-commands args[0] args[1] ..."
  const args = message.content.toLowerCase()
    .slice(prefix.length)
    .split(/ +/);
  let command = args.shift();

  // get the module name based on the command sent by user thru the aliases
  command = client.commands.array().find(c => 
    c.aliases.find( a => a === command)).name;

  if (command === 'commands')
    client.commands.get('commands').execute(message, args, Discord, commandFields);

  else if(command)
    client.commands.get(command).execute(message, args, Discord);

});

// bot auth
client.login(config.token);

// parse for fields of commands embed
function parseField(command, prefix) {
  let obj = {name: '', value: ''};

  // name = possible commands
  for(let i = 0; i < command.aliases.length; i++) {
    obj.name += prefix + command.aliases[i];
    if(i !== command.aliases.length - 1) obj.name += '\t';
  }

  obj.value = command.description;
  return obj;
}