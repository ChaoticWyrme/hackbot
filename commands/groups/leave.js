// ./commands/groups/leave.js
const { Command } = require('discord.js-commando');
const groups = require('../../groups.js');

class LeaveGroupCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      group: 'groups',
      memberName:'leave',
      description: 'Leave the group you are in.',
    });
  }

  hasPermission(msg) {
    return groups.userExists(msg.member.id) ? true : 'You are not in an active group.';
  }

  async run(msg, args) {
    msg.reply(groups.deleteUser(msg.member.id));
  }
}

module.exports = LeaveGroupCommand;