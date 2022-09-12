const { config, prefix } = require("../../conf/discConfig.json");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Display Commands',
  adminOnly: false,
  visible: true,
  execute(message, args, generalCommands, adminCommands) {
    let helpMessageEmbed = new EmbedBuilder()
                                    .setColor(0xa34100)
                                    .setTitle('botster command list')
                                    .setThumbnail('https://i.postimg.cc/3r1s23LS/botster.png')
                                    .addFields(
                                      {
                                        name: '__General Commands__',
                                        value: ' - *These can be used by anyone*',
                                      },
                                    )
                                    .addFields(generalCommands)
                                    .addFields(
                                      { name: '\u200B', value: '\u200B' },
                                      {
                                        name: '__Admin & Mod Commands__',
                                        value: `Try \`${prefix}modhelp\` for a list of privileged commands`,
                                      },
                                    )
    message.channel.send({ embeds: [helpMessageEmbed] });
  },
};
