// ./commands/admin/clearUsers.js
const { Command } = require('discord.js-commando');
const groups = require('../../groups.js');

class ClearUsersCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'clearUsers',
      group: 'admin',
      memberName:'clearUsers',
      description: 'Clear the database of user->group data, allowing all users to create/join a new group, but invalidating the old group.',
    });
  }

  async run(msg) {
    groups.clearUserDB();
    msg.reply('Done.');
  }
}

module.exports = ClearUsersCommand;