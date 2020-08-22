module.exports = {
	name: 'quit',
	description: "quit command",
	execute(message, args, client) {
		message.channel.send("Quitting game...");
		message.channel.send("Game over. Type '!avalon' to play again!")
		.then(m => client.destroy())
		.then(() => client.login('NzM3MjM3MzA2NTY5Nzg1NTA0.Xx6bvw.nDZs7RI8PuxnvBUnJWsJKvnx-CE'));

	}

}