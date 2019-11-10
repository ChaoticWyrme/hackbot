// ./commands/info/list.js
const { Command } = require('discord.js-commando');


class ListInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'listInfo',
      group: 'info',
      memberName:'listInfo',
      description: 'Lists the available info topics.',
      guildOnly: true,
    });
  }

  async run(msg, args) {
    return 'not implemented';
  }
}

module.exports = ListInfoCommand;