const { Command } = require('discord.js-commando');
const groups = require('../../groups.js');

class CreateGroupCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'create-group',
      group: 'groups',
      memberName:'create-group',
      description: 'Create a group, and add yourself to it.',
    });
  }

  hasPermission(msg) {
    if (groups.userExists(msg.member.id)) {
      return 'Leave your current group before creating a new one.';
    } else {
      return true;
    }
  }

  async run(msg) {
    groups.createGroup(msg.member.id, msg.guild.settings.get('eventID'));
  }
}

module.exports = CreateGroupCommand;