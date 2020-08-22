module.exports = {
	name: 'avalon',
	description: "avalon game",
	async execute(message, args) {
		
		const Discord = require('discord.js');

		let players = new Discord.Collection().array();
		let numPlayers = 0;
		let shuffledPlayers = new Discord.Collection().array();
		let missionLeaderPosition = 0;
		let totalNumPassed = 0;
		let totalNumFailed = 0;
		const numOnMissionArray = [
			[2, 3, 2, 3, 3],
			[2, 3, 4, 3, 4],
			[2, 3, 3, 4, 4],
			[3, 4, 4, 5, 5]
		];

		let failNormalCase = 1;
		let failSpecialCase = 1;
		let assassinPos5 = false;


		function shuffleArray(array) {

		    for (var i = array.length - 1; i > 0; i--) {
		        var j = Math.floor(Math.random() * (i + 1));
		        var temp = array[i];
		        array[i] = array[j];
		        array[j] = temp;
    		}
    		return array;

		}

		function sendOutRoles(players, numPlayers) {

			const p1 = players[0];
			//p1.send("you role is");
			const p2 = players[1];
			const p3 = players[2];
			const p4 = players[3];
			const p5 = players[4];

			let random = Math.floor(Math.random() * 2);

			if (random === 0) {
				p2.send("You are on the side of Good. Your role is Percival. This is what you know: Between " 
					+ p1.toString() + " and " + p3.toString() + ", one is Merlin and the other is Morgana.");
			} else if (random === 1) {
				p2.send("You are on the side of Good. Your role is Percival. This is what you know: Between " 
					+ p3.toString() + " and " + p1.toString() + ", one is Merlin and the other is Morgana.");
			}


			if (numPlayers === 5) {

				p1.send("You are on the side of Good. Your role is Merlin. This is what you know: " + p3.toString() + " is Evil.");
				p3.send("You are on the side of Evil. Your role is Morgana. You do not know any additional information.");
				p4.send("You are on the side of Evil. Your role is Mordred. You are also the assassin. You do not know any additional information.");
				p5.send("You are on the side of Good. You are a Loyal Servant of Arthur. You do not know any additional information.");

			}

			if (numPlayers === 6) {

				const p6 = players[5];

				p1.send("You are on the side of Good. Your role is Merlin. This is what you know: " + p3.toString() + " is Evil.");
				p3.send("You are on the side of Evil. Your role is Morgana. This is what you know: " 
					+ p4.toString() + " is Mordred.");
				p4.send("You are on the side of Evil. Your role is Mordred. You are also the assassin. This is what you know: " 
					+ p3.toString() + " is Morgana.");
				p5.send("You are on the side of Good. You are a Loyal Servant of Arthur. You do not know any additional information.");
				p6.send("You are on the side of Good. You are a Loyal Servant of Arthur. You do not know any additional information.");

			}

			if (numPlayers === 7) {

				const p6 = players[5];
				const p7 = players[6];

				let random = Math.floor(Math.random() * 2);

				if (random === 0) {

					p1.send("You are on the side of Good. Your role is Merlin. This is what you know: " 
						+ p3.toString() + " and " + p4.toString() + " are Evil.");

				} else if (random === 1) {

					p1.send("You are on the side of Good. Your role is Merlin. This is what you know: " 
						+ p4.toString() + " and " + p3.toString() + " are Evil.");

				}
				
				p3.send("You are on the side of Evil. Your role is Morgana. This is what you know: " 
					+ p5.toString() + " is Mordred.");
				p4.send("You are on the side of Evil. Your role is Oberon. You are also the assassin. You do not know any additional information.");
				p5.send("You are on the side of Evil. Your role is Mordred. This is what you know: " 
					+ p3.toString() + " is Morgana.");
				p6.send("You are on the side of Good. You are a Loyal Servant of Arthur. You do not know any additional information.");
				p7.send("You are on the side of Good. You are a Loyal Servant of Arthur. You do not know any additional information.");

			}

			if (numPlayers === 8 ) {

				const p6 = players[5];
				const p7 = players[6];
				const p8 = players[7];
				
				let random = Math.floor(Math.random() * 2);

				if (random === 0) {

					p1.send("You are on the side of Good. Your role is Merlin. This is what you know: " 
						+ p3.toString() + " and " + p4.toString() + " are Evil.");
					p3.send("You are on the side of Evil. Your role is Morgana. This is what you know: " 
						+ p4.toString() + " and " + p5.toString() + " are also Evil.");
					p4.send("You are on the side of Evil. Your role is Assassin. This is what you know: " 
						+ p3.toString() + " and " + p5.toString() + " are also Evil.");
					p5.send("You are on the side of Evil. Your role is Mordred. This is what you know: " 
						+ p3.toString() + " and " + p4.toString() + " are also Evil.");


				} else if (random === 1) {

					p1.send("You are on the side of Good. Your role is Merlin. This is what you know: " 
						+ p4.toString() + " and " + p3.toString() + " are Evil.");
					p3.send("You are on the side of Evil. Your role is Morgana. This is what you know: " 
						+ p5.toString() + " and " + p4.toString() + " are also Evil.");
					p4.send("You are on the side of Evil. Your role is Assassin. This is what you know: " 
						+ p5.toString() + " and " + p3.toString() + " are also Evil.");
					p5.send("You are on the side of Evil. Your role is Mordred. This is what you know: " 
						+ p4.toString() + " and " + p3.toString() + " are also Evil.");

				}

				p6.send("You are on the side of Good. You are a Loyal Servant of Arthur. You do not know any additional information.");
				p7.send("You are on the side of Good. You are a Loyal Servant of Arthur. You do not know any additional information.");
				p8.send("You are on the side of Good. You are a Loyal Servant of Arthur. You do not know any additional information.");

			}

			return;

		} 

		function setUpGame(numPlayers) {

			if (numPlayers > 6) {
				failSpecialCase = 2;
				assassinPos5 = true;
			}

			return;

		}


		async function mission(shuffledPlayers, roundNumber, numOnMissionX, failCase) {

			return new Promise(async resolve => {

				let missionLeader = shuffledPlayers[missionLeaderPosition];
				message.channel.send("Mission #" + roundNumber + ": ");
				message.channel.send("Reminder of gameplay order: " + shuffledPlayers.toString());
				message.channel.send(missionLeader.toString() + " is mission leader.");
				message.channel.send(missionLeader.toString() + ", please type the @ of " + numOnMissionX 
					+ " people to go on the mission. Include yourself in the list if you wish to take yourself on the mission.");
				missionLeaderPosition++;
				missionLeaderPosition %= players.length;

				playersOnMission = new Discord.Collection().array();

				playersOnMission = await createValidMission(missionLeader, numOnMissionX);


				let yesVotes = new Discord.Collection().array();
				let noVotes = new Discord.Collection().array();

				missionProposalPass = await missionProposalVoting(shuffledPlayers, yesVotes, noVotes);

	            console.log(yesVotes);
				console.log(noVotes);

				if (missionProposalPass) {

					message.channel.send("The mission proposal passed.");
					message.channel.send("People who passed: " + yesVotes.toString());
					message.channel.send("People who failed: " + noVotes.toString());

					let passVotes = new Discord.Collection().array();
					let failVotes = new Discord.Collection().array();

					missionPass = await missionVoting(playersOnMission, passVotes, failVotes, failCase);

					if (missionPass) {
						totalNumPassed++;
						message.channel.send("The mission passed with " + passVotes.length + " pass(es) and " + failVotes.length + " fail(s).");
						message.channel.send("Current Score: " + totalNumPassed + " pass(es); " + totalNumFailed + " fail(s)");
						if (totalNumPassed === 3 || totalNumFailed === 3) {
							resolve(true);
						} else {
							resolve(false);
						}
					} else {
						totalNumFailed++;
						message.channel.send("The mission failed with " + passVotes.length + " pass(es) and " + failVotes.length + " fail(s).");
						message.channel.send("Current Score: " + totalNumPassed + " pass(es); " + totalNumFailed + " fail(s)");
						if (totalNumPassed === 3 || totalNumFailed === 3) {
							resolve(true);
						} else {
							resolve(false);
						}
					}

				} else {

					message.channel.send("The mission proposal failed.");
					message.channel.send("People who passed: " + yesVotes.toString());
					message.channel.send("People who failed: " + noVotes.toString());
					resolve(mission(shuffledPlayers, roundNumber, numOnMissionX, failCase));

				}

			});

		}

		function createValidMission(missionLeader, numOnMissionX) {

			console.log("creating valid mission");

			return new Promise(resolve => {

				const filter = m => (m.author === missionLeader);

				proposalCollector = message.channel.createMessageCollector(filter);

				proposalCollector.on('collect', m => {

					console.log(`Collected ${m.content}`);

					for (const player of m.mentions.users) {
						if (!playersOnMission.includes(player[1]) && players.includes(player[1]) && playersOnMission.length < numOnMissionX) {
							playersOnMission.push(player[1]);
							console.log(playersOnMission);
						}
					}

					if (playersOnMission.length === numOnMissionX) {
						resolve(playersOnMission);
					}

				});

			});

		}

		function missionProposalVoting(shuffledPlayers, yesVotes, noVotes) {

			console.log("mission proposal voting");

			message.channel.send("The proposed mission is: " + playersOnMission.toString() + " Check your DMs to vote.");

			return new Promise(resolve => {

				const filter = m => (m.content.toLowerCase() === ('pass') || m.content.toLowerCase() === ('fail'));

	    		for (const player of players) {

	    			player.send("MISSION PROPOSAL: Please respond with 'pass' or 'fail' to pass or fail the proposed mission.")
	    			.then(sentMessage => {

	    				proposalVotesCollector = sentMessage.channel.createMessageCollector(filter);

						proposalVotesCollector.on('collect', m => {

							console.log(`Collected ${m.content}`);

							if (m.content === 'pass' && !yesVotes.includes(m.author) && !noVotes.includes(m.author)) {
	                			yesVotes.push(m.author);
	                			console.log(yesVotes);
				                if (yesVotes.length + noVotes.length === numPlayers) {
			    					console.log("resolving");
			    					resolve(yesVotes.length > noVotes.length);
			    				}
	            			} else if (m.content === 'fail' && !yesVotes.includes(m.author) && !noVotes.includes(m.author)){
	                			noVotes.push(m.author);
				                if (yesVotes.length + noVotes.length === numPlayers) {
			    					console.log("resolving");
			    					resolve(yesVotes.length > noVotes.length);
			    				}
	            			}

						});

	        		});

    			}

    		});

		}

		function missionVoting(playersOnMission, passVotes, failVotes, failCase) {

			console.log("mission voting");

			message.channel.send(playersOnMission.toString() + " are going on the mission. Check your DMs to vote.");

			return new Promise(resolve => {

				const filter = m => (m.content.toLowerCase() === ('pass') || m.content.toLowerCase() === ('fail'));

	    		for (const player of playersOnMission) {

	    			player.send("MISSION: Please respond with 'pass' or 'fail' to pass or fail the mission.")
	    			.then(sentMessage => {

	    				let missionVotesCollector = sentMessage.channel.createMessageCollector(filter);

						missionVotesCollector.on('collect', m => {

							console.log(`Collected ${m.content}`);

							if (m.content === 'pass' && !passVotes.includes(m.author) && !failVotes.includes(m.author)) {
	                			passVotes.push(m.author);
	                			console.log(passVotes);
				                if (passVotes.length + failVotes.length === playersOnMission.length) {
			    					console.log("resolving");
			    					resolve(failVotes < failCase);
			    				}
	            			} else if (m.content === 'fail' && !passVotes.includes(m.author) && !failVotes.includes(m.author)){
	                			failVotes.push(m.author);
				                if (passVotes.length + failVotes.length === playersOnMission.length) {
			    					console.log("resolving");
			    					resolve(failVotes < failCase);
			    				}
	            			}

						});

	        		});

    			}

    		});

		}

		function gameEnd(assassin, merlin) {

			console.log("end game");

			if (totalNumPassed === 3) {

				message.channel.send("Evil, you still have one more chance to win. You must correct identify Merlin.");
				message.channel.send(assassin.toString() + ", you are the Assassin. Type the @ of the person you believe is Merlin. Choose wisely!");
				
				let winner = "Good";

				let assassinVote = new Discord.Collection().array();

				const filter = m => (m.author === assassin);
				
				let assassinVoteCollector = message.channel.createMessageCollector(filter, {max: 1});

				assassinVoteCollector.on('collect', m => {

					for (const player of m.mentions.users) {
						if (!assassinVote.includes(player[1]) && players.includes(player[1])) {
							assassinVote.push(player[1]);
						}
					}

					if (assassinVote.length > 0) {

						if (assassinVote[0] === merlin) {

							message.channel.send("You are correct!");
							winner = "Evil";

						} else if (assassinVote[0] != merlin) {

							message.channel.send("Sorry, you are incorrect.")
							winner = "Good";

						}
						
					} else {
						message.channel.send("Sorry, that was an invalid name. You lost your chance to win.");
						winner = "Good";
					}


				});

				assassinVoteCollector.on('end', collected => {
					actualGameEnd(winner);

				});

			} else if (totalNumFailed === 3) {

				let winner = "Evil";
				actualGameEnd(winner);

			}

			return;

		}

		function actualGameEnd(winner) {

			console.log("actual game end");

			message.channel.send("Congratulations! " + winner + " wins!");

			revealRoles();

			message.channel.send("Type '!avalon' to play again!");

			return;

		}

		function revealRoles() {

			message.channel.send("Role Reveal: ");

			if (numPlayers === 5) {
				message.channel.send("Merlin - " + p1.toString() +"\nPercival - " + p2.toString() + "\nMorgona - " + p3.toString() 
					+ "\nMordred - " + p4.toString() 
					+ "\nLoyal Servants of Arthur - " + p5.toString());
			}

			if (numPlayers === 6) {
				message.channel.send("Merlin - " + p1.toString() +"\nPercival - " + p2.toString() + "\nMorgona - " + p3.toString() 
					+ "\nMordred - " + p4.toString() 
					+ "\nLoyal Servants of Arthur - " + p5.toString() + " " + p6.toString());
			}

			if (numPlayers === 7) {
				message.channel.send("Merlin - " + p1.toString() +"\nPercival - " + p2.toString() + "\nMorgona - " + p3.toString() 
					+ "\nMordred - " + p4.toString() + "\nOberon - " + p5.toString() 
					+ "\nLoyal Servants of Arthur - " + p6.toString() + " " + p7.toString());
			}

			if (numPlayers === 8) {
				message.channel.send("Merlin - " + p1.toString() +"\nPercival - " + p2.toString() + "\nMorgona - " + p3.toString() 
					+ "\nMordred - " + p4.toString() + "\nAssassin - " + p5.toString() 
					+ "\nLoyal Servants of Arthur - " + p6.toString() + " " + p7.toString() + " " + p8.toString());
			}

			return;

		}


		message.channel.send("Welcome to The Resistance: AVALON\n\nSome helpful commands:\n"
			+ "\t!rules \t\t\t- sends link to rules of the game\n\t!missions \t- sends an info chart for # of players on each mission\n"
			+ "\t!quit \t\t\t- quits the game for EVERYONE\n\nReact to join the game!").then(sentMessage => {

			sentMessage.react('✅');

			const collector = sentMessage.createReactionCollector(
				(r, u) => r.emoji.name === '✅' && !u.bot, { time: 30000 });

			collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));

			collector.on('end', collected => {
				console.log(`Collected ${collected.size} items`);

				for (user of collector.users) {
					players.push(user[1]);
					shuffledPlayers.push(user[1]);
				}

				console.log(players);

				numPlayers = players.length;

				if (numPlayers >= 5 && numPlayers <= 8) {	

					message.channel.send(players.toString() + " have joined the game.\nTotal: " + players.length + " players");
					message.channel.send("Randomizing roles...");
					players = shuffleArray(players);

					console.log(numPlayers);
					console.log(players);

					setTimeout(() => { 

						message.channel.send("All done! Sending roles out now. Check your DMs!");
						sendOutRoles(players, numPlayers); 
						const assassin = players[3];
						const merlin = players[0];
						setTimeout(() => { 

							message.channel.send("Now let's start the game! Shuffling gameplay order...");
							shuffledPlayers = shuffleArray(players);
							setTimeout(() => { 

								message.channel.send("Here is the order of gameplay: " + shuffledPlayers.toString());
								setTimeout(async () => {

									setUpGame(numPlayers);

									let round = 1;
									numOnMissionX = numOnMissionArray[numPlayers - 5][round - 1];
									gameOver = await mission(shuffledPlayers, round, numOnMissionX, failNormalCase);
									if (!gameOver) {
										round = 2;
										numOnMissionX = numOnMissionArray[numPlayers - 5][round - 1];
										gameOver = await mission(shuffledPlayers, round, numOnMissionX, failNormalCase);
										if (!gameOver) {
											round = 3;
											numOnMissionX = numOnMissionArray[numPlayers - 5][round - 1];
											gameOver = await mission(shuffledPlayers, round, numOnMissionX, failNormalCase);
											if (!gameOver) {
												round = 4;
												numOnMissionX = numOnMissionArray[numPlayers - 5][round - 1];
												gameOver = await mission(shuffledPlayers, round, numOnMissionX, failSpecialCase);
												if (!gameOver) {
													round = 5;
													numOnMissionX = numOnMissionArray[numPlayers - 5][round - 1];
													gameOver = await mission(shuffledPlayers, round, numOnMissionX, failNormalCase);
													gameEnd(assassin, merlin);
												} else {
													gameEnd(assassin, merlin);
												}
											} else {
												gameEnd(assassin, merlin);
											}
										}
									}

								}, 3000);
							}, 2000);
						}, 15000)
					}, 2000);


				} else if (numPlayers < 5) {
					message.channel.send("Not enough players... You need at least 5 players to play.")
					message.channel.send("Type '!avalon' to try again.");
				} else if (numPlayers > 8) {
					message.channel.send("Too many players... I can only handle up to 8 players.")
					message.channel.send("Type '!avalon' to try again.");

				}

				return;

			});

		});

	}

}




