// ./commands/info/getInfo.js
const { Command } = require('discord.js-commando');


class GetInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      group: 'info',
      memberName:'get',
      description: 'Get information about the event.',
      args: [
        {
          key: 'key',
          label: 'topic',
          validate: (key, msg) => {
            return (typeof msg.guild.settings.get(`info-${key}`) === 'string') ?
              true : 'There is no info on this topic';
          },
        },
      ],
      guildOnly: true,
    });
  }

  async run(msg, args) {
    msg.reply(msg.guild.settings.get(args.key));
  }
}

module.exports = GetInfoCommand;