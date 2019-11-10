// ./commands/info/list.js
const { Command } = require('discord.js-commando');


class ListInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'list-info',
      group: 'info',
      memberName:'list',
      description: 'Lists the available info topics.',
      guildOnly: true,
    });
  }

  async run(msg, args) {
    return 'not implemented';
  }
}

module.exports = ListInfoCommand;