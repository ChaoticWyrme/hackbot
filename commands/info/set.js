// ./commands/info/setInfo.js
const { Command } = require('discord.js-commando');
const info = require('../../info.js');

class SetInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'set-info',
      group: 'info',
      memberName:'set',
      description: 'Set an info key',
      args: [
        {
          key: 'topic',
          prompt: 'The topic of the information.',
          type: 'string',
        },
        {
          key: 'value',
          prompt: 'The info message',
          type: 'string',
        },
      ],
    });
  }

  async run(msg, args) {
    if (args.value === '-1') {
      info.delete(`info-${args.topic}`);
    } else {
      info.set(args.topic, args.value);
    }
  }
}

module.exports = SetInfoCommand;