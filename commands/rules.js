module.exports = {
	name: 'rules',
	description: "avalon game rules command",
	execute(message, args) {
		message.channel.send(message.author.toString() + "\nhttp://upload.snakesandlattes.com/rules/r/ResistanceAvalon.pdf");

	}

}