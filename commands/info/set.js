// ./commands/info/setInfo.js
const { Command } = require('discord.js-commando');


class SetInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setInfo',
      group: 'info',
      memberName:'set',
      description: 'Set an info key',
      args: [
        {
          key: 'topic',
          prompt: 'The topic of the information.',
        },
        {
          key: 'value',
          prompt: 'The info message',
        },
      ],
    });
  }

  async run(msg, args) {
    if (args.value === '-1') {
      msg.guild.settings.remove(`info-${args.topic}`);
    } else {
      msg.guild.settings.set(args.topic, args.value);
    }
  }
}

module.exports = SetInfoCommand;