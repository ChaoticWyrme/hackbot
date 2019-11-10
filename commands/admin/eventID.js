// ./commands/admin/eventID.js
const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const groups = require('../../groups.js');

class EventIDCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'eventID',
      group: 'admin',
      memberName:'eventID',
      description: 'Get or set the event id. DANGEROUS.',
      args: [
        {
          id: 'action',
          prompt: 'Action to take',
          oneOf: [
            'get',
            'set',
            'change',
          ],
          default: 'get',
        },
        {
          id: 'newID',
          prompt: 'newID',
          default: '',
        },
      ],
      examples: [
        '//get event id',
        'get',
        'set coolEvent2019',
        'change coolEventSponsoredByAnAwesomeSponsor2019',
      ],
      details: stripIndents`Gets or sets the current event id.
      With the get action or no action, replies with the current event ID.
      With the set action, set the event id to the new ID.
      With the change action, set the event id to the new ID and change any groups with that id.`,
      userPermissions: ['ADMINISTRATOR'],
      guildOnly: true,
    });
  }

  async run(msg, args) {
    if ((args.action === 'set' || args.action === 'change') && args.newID.length === 0) {
      msg.reply('Please provide a new event ID');
      return;
    }
    let oldID = msg.guild.settings.get('eventID');
    switch (args.action) {
      case 'get':
        msg.reply(`EventID is ${oldID}}`);
        break;
      case 'set':
        msg.guild.settings.set('eventID', args.newID);
        msg.reply(`Event ID set. You may want to run the archive command with the old event ID(${oldID}) and the clearUsers command to clear the user->team pairings.`);
        break;
      case 'change':
        msg.guild.settings.set('eventID', args.newID);
        groups.changeEventID(args.newID);
        msg.reply('Event ID changed.');
        break;
    }
  }
}

module.exports = EventIDCommand;