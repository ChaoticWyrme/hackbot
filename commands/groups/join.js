// ./commands/groups/join.js
const { Command } = require('discord.js-commando');
const groups = require('../../groups.js');

class JoinGroupCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'join',
      group: 'groups',
      memberName:'join',
      description: 'Join a group',
      args: [
        {
          key: 'groupID',
          validate: group => {
            groups.groupExists(group) ? true : 'Group does not exist';
          },
        },
        {
          key: 'pass',
          label: 'Password',
          prompt: 'Password for group, optional',
          default: false,
        },
      ],
    });
  }

  async run(msg, args) {
    if (groups.checkPass(args.groupID, args.pass)) {
      groups.addUser(args.groupID, msg.member.id);
      msg.reply('Group joined successfully');
    } else {
      msg.reply('Password not accepted');
    }
  }
}

module.exports = JoinGroupCommand;