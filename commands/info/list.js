// ./commands/info/list.js
const { Command } = require('discord.js-commando');
const info = require('../../info.js');

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

  async run(msg) {
    let listString = 'Info topics: \n';
    for (let topic of info.list()) {
      listString += ' - ' + topic;
    }
    msg.reply(listString, {
      code: true,
    });
  }
}

module.exports = ListInfoCommand;