const fs = require('fs');
const { ChannelType } = require('discord.js');
const { prefix } = require('../conf/discConfig.json');
const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));
let generalCommands = [];
let adminCommands = [];
let allCommands = [generalCommands, adminCommands];
for (const file of commandFiles) {
  const command = require(`../modules/${file}`);
  if (!command.visible) { continue; }
  let commandField = { name: command.name, value: command.description, inline: true }
  if (command.adminOnly) {
    adminCommands.push(commandField)
  } else {
    generalCommands.push(commandField)
  }
}

for (const commandList of allCommands) {
  if (commandList.length%3 === 1) {
    commandList.splice(commandList.length, 0, { name: '\u200B', value: '\u200B', inline: true });
    commandList.splice(commandList.length-2, 0, { name: '\u200B', value: '\u200B', inline: true })
  }

  if (commandList.length%3 === 2) {
    commandList.splice(commandList.length-1, 0, { name: '\u200B', value: '\u200B', inline: true });
  }
}

module.exports = {
	name: 'messageCreate',
	once: false,
	execute(message) {
    if (message.channel.type !== ChannelType.GuildText) { return };
    if (message.author.bot) { return };

    // If the text doesn't start with a prefix, it's not a command
    if (!content.startsWith(prefix)){ return }

    let lowerCaseArgs = content.trim().toLowerCase().split(' ');
    let commandAttempt = lowerCaseArgs[0].substring(1);

    if (!generalCommands.find(o => o.name === commandAttempt) && !adminCommands.find(o => o.name === commandAttempt)) { return console.log('\x1b[31m%s\x1b[0m', `${message.author.username} attempted to use a command that doesn't exist: ${commandAttempt}`) }

    const commandToRun = require(`../modules/${commandAttempt}.js`);
    commandToRun.execute(message, args, generalCommands, adminCommands);
	},
};
