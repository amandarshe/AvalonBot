module.exports = {
	name: 'missions',
	description: "num on mission command",
	execute(message, args) {
		message.channel.send(message.author, { files: ['./missionsChart.png'] })

	}

}