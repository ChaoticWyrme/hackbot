// ./commands/info/getInfo.js
const { Command } = require('discord.js-commando');
const info = require('../../info.js');

class GetInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info-get',
      group: 'info',
      memberName:'get',
      description: 'Get information about the event.',
      args: [
        {
          key: 'key',
          label: 'topic',
          type: 'string',
          validate: (key, msg) => {
            return (typeof msg.guild.settings.get(`info-${key}`) === 'string') ?
              true : 'There is no info on this topic';
          },
          prompt: 'Topic to get information about.',
        },
      ],
      guildOnly: true,
    });
  }

  async run(msg, args) {
    msg.reply(info.get(args.key));
  }
}

module.exports = GetInfoCommand;