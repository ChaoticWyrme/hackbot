// ./commands/admin/archive.js
// archives old events
const { Command } = require('discord.js-commando');
const groups = require('../../groups.js');

class ArchiveEventCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'archive',
      group: 'admin',
      memberName:'archive',
      description: 'Archives an old event. Run with clearUsers to clear the user cache in preparation for a new event.',
      argsType: 'single',
      userPermissions: ['ADMINISTRATOR'],
    });
  }

  async run(msg, eventID) {
    groups.archiveEvent(eventID);
    msg.reply('Done.');
  }
}

module.exports = ArchiveEventCommand;