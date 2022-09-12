const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    client.user.setActivity('Discord chats', { type: ActivityType.Listening });
    console.log('\x1b[32m%s\x1b[0m', `${client.user.username} is online!`);
	},
};
