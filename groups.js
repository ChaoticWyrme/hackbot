// ./groups.js
const Enmap = require('enmap');

const fullGroupDB = new Enmap('groups');
let groupDB = fullGroupDB;
const userDB = new Enmap('users');

// filter groupDB so that it only contains the groups with the given eventID
function selectEventID(eventID) {
  groupDB = fullGroupDB.partition(group => group.event === eventID)[0];
}

// unfilter groupDB
function selectAllEvents() {
  groupDB = fullGroupDB;
}

// recursive, generates uuid
// eslint-disable-next-line
function genGroupID() {
  // returns 6 digit number
  return Math.floor(100000 + Math.random() * 900000);
}

// create a group and return its' id for joining
function createGroup(userID, eventID) {
  if (userDB.has(userID)) {
    return "You can't create a group, you're already in one!";
  }

  let group = {
    id: 0,
    pass: false,
    owner: userID,
    name: '',
    description: '',
    users: [ userID ],
    links: [],
    repo: '',
    event: eventID,
    archived: false,
  };

  // generate a group id until you get a unique one
  do {
    group.id = genGroupID();
  } while(groupDB.has(group.id));

  groupDB.set(group.id, group);
  createUser(userID, group.id);
  return group.id;
}

function groupExists(groupID) {
  return groupDB.has(groupID);
}

function userExists(userID) {
  return userDB.has(userID);
}

function checkPass(groupID, pass) {
  let groupPass = groupDB.getProp(groupID, 'pass');
  if (typeof groupPass !== 'string' || groupPass.length === 0) {
    return true;
  } else {
    return pass === groupPass;
  }
}

function addUser(groupID, userID) {
  deleteUser(userID);
  groupDB.push(groupID, userID, 'users');
  userDB.ensure(userID, groupID);
}

function setOwner(groupID, userID) {
  groupDB.set(groupID, userID, 'owner');
}

function getGroupID(userID) {
  return userDB.get(userID);
}

// remove user from group
// if they are the owner and the last member, delete the group instead
// if they are the owner and not the last member, throw an error
function deleteUser(userID) {
  try {
    let group = groupDB.get(userDB.get(userID));
    if (group.owner === userID) {
      if (group.users.length > 1) {
        return 'The creator cannot leave the group unless they are the last member';
      } else {
        return deleteGroup(group.id);
      }
    }
    groupDB.remove(group.id, userID, 'users');
    userDB.delete(userID);
    return 'User removed from group';
  } catch(err) {
    userDB.delete(userID);
    return 'User removed from group';
  }
}

function deleteGroup(groupID) {
  let users = groupDB.get(groupID, 'users');
  if (users.length > 1) {
    return 'Cannot delete group unless there is 1 or less members';
  }
  groupDB.delete(groupID);
  if (users.length === 1) {
    userDB.remove(users[0]);
  }
}

function createUser(userID, groupID) {
  if (userDB.has(userID)) {
    return 'User already exists';
  }

  userDB.set(userID, groupID);
}

function getGroup(userID) {
  return groupDB.get(userDB.get(userID));
}

function isOwner(userID) {
  return userID === groupDB.get(userDB.get(userID), 'owner');
}

function setProp(groupID, prop, val) {
  groupDB.setProp(groupID, prop, val);
}

// changes the eventID for all groups with oldID to newID
function changeEventID(oldID, newID) {
  selectEventID(oldID);
  let keys = groupDB.keyArray();
  for (let key of keys) {
    groupDB.setProp(key, 'event', newID);
  }
  selectEventID(newID);
}

function archiveEvent(event) {
  selectEventID(event);
  let keys = groupDB.keyArray();
  for (let key of keys) {
    groupDB.setProp(key, 'archived', true);
  }
}

function clearUserDB() {
  userDB.clear();
}

module.exports = {
  getGroup,
  deleteUser,
  setOwner,
  addUser,
  checkPass,
  getGroupID,
  groupExists,
  userExists,
  createGroup,
  isOwner,
  setProp,
  selectEventID,
  selectAllEvents,
  archiveEvent,
  clearUserDB,
  changeEventID,
};