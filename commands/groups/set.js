// ./commands/groups/set.js
const { Command } = require('discord.js-commando');
const groups = require('../../groups.js');

class GroupSetCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'group-set',
      aliases: [
        'set',
      ],
      group: 'groups',
      memberName:'set',
      description: 'Set a property of your group',
      args: [
        {
          key: 'prop',
          prompt: 'Property to set.',
          oneOf: [
            'pass',
            'name',
            'description',
            'repo',
          ],
        },
        {
          key: 'value',
          prompt: 'The value to set the property to',
        },
      ],
    });
  }

  hasPermission(msg) {
    if (groups.isOwner(msg.member.id)) {
      return true;
    } else {
      return 'Only the owner of the group can set properties';
    }
  }

  async run(msg, args) {
    groups.setProp(groups.getGroup(msg.member.id), args.prop, args.val);
  }
}

module.exports = GroupSetCommand;