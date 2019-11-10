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
    let id = groups.createGroup(msg.member.id, msg.guild.settings.get('eventID'));
    msg.author.createDM().then(channel => {
      channel.send(`Group created, anyone can join with the code ${id}, unless you set a password.`);
      msg.reply('Group created, join id sent to you.');
    });
  }
}

module.exports = CreateGroupCommand;