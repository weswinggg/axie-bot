const Discord = require('discord.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
// create bot
const client = new Discord.Client();

const prefix = '*';

mongoose.connect(process.env.mongo_srv, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then( () => {
  console.log('connected to the database')
}).catch( (err) => {
  console.log(err);
});

// setup filesystem function
const fs = require('fs');
const { default: fetch } = require('node-fetch');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

client.commands = new Discord.Collection();

// get list of command files
let commandFields = [];
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);

  // parse for *help/*commands list
  commandFields.push(parseField(command, prefix));
}

/*
To add new commands, create new JS file under commands/
set aliases for the possible commands (i.e -mp & -marketplace)
use this execute(message, args, Discord, prefix)
If need more parameters, add a new else if logic when checking the command variable below
*/

// when ready, execute console.log 
client.once('ready', () => {
  console.log('Axie Guru is now online')
});

// get gas price periodically
client.on('ready', () => {
  client.setInterval( async function (){
    let json = await fetch(`https://www.gasnow.org/api/v3/gas/price?utm_source=:axie-bot`).then(response => response.json());
    
    fs.writeFile("./JSONFiles/gas.json", JSON.stringify(json.data), err => {
      if(err) console.log(err)
    });
  }, 30000) // Runs every 30 seconds
})

// execute when users message
client.on('message', message => {
  // guard if, ignore messages not starting with the prefix and from the bot itself
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // accept cmd like "-commands args[0] args[1] ..."
  const args = message.content.toLowerCase()
    .slice(prefix.length)
    .split(/ +/);
  let command = args.shift();

  // get the module name based on the command sent by user thru the aliases
  if(!client.commands.array().find(c => c.aliases.find( a => a === command))) return;
  command = client.commands.array().find(c => 
    c.aliases.find( a => a === command)).name;

  // commande module separated because it needs additional parameter (commands list)
  if (command === 'commands')
    client.commands.get(command).execute(message, args, Discord, commandFields, prefix);

  // the rest of the commands
  else if(command)
    client.commands.get(command).execute(message, args, Discord, prefix);

});

// bot auth (use your own discord bot token)
// rename config_sample.json -> config.json
client.login(process.env.token);

// parse for fields of commands embed
function parseField(command, prefix) {
  // setup for embed fields
  let obj = {name: '', value: ''};

  // name = possible commands
  // parse the list of commands to display
  for(let i = 0; i < command.aliases.length; i++) {
    obj.name += prefix + command.aliases[i];
    if(i !== command.aliases.length - 1) obj.name += '\t';
  }

  // what does the command do
  obj.value = command.description;
  return obj;
}
