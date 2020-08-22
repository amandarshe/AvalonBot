module.exports = {
	name: 'quit',
	description: "quit command",
	execute(message, args, client) {
		const token = require('./botToken.js');
		message.channel.send("Quitting game...");
		message.channel.send("Game over. Type '!avalon' to play again!")
		.then(m => client.destroy())
		.then(() => client.login(token.getBotToken()));

	}

}