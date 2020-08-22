const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("AvalonBot is online!");
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'avalon') {
        client.commands.get('avalon').execute(message, args);
    }

    if (command === 'quit') {
        client.commands.get('quit').execute(message, args, client);
    }

    if (command === 'missions') {
        client.commands.get('missions').execute(message, args);
    }

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    }

    if (command === 'rules') {
        client.commands.get('rules').execute(message, args);
    }
    
});

client.login(''); //insert token