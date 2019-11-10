const { Client, SyncSQLiteProvider } = require('discord.js-commando');
const path = require('path');
require('dotenv').config();

const client = new Client({
  owner: '171043851178475520',
});

const db = require('better-sqlite3')('settings.db');
client.setProvider(new SyncSQLiteProvider(db));

client.registry
  .registerGroups([
    ['groups', 'Hackathon groups'],
    ['info', 'Event information'],
    ['admin', 'Event administrator commands'],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.login(process.env.DISCORD_TOKEN);