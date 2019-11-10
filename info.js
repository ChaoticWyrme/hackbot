const infoDB = new (require('enmap'))('info');

function set(topic, value) {
  infoDB.set(topic, value);
}

function get(topic) {
  return infoDB.get(topic);
}

function list() {
  return infoDB.keyArray();
}

module.exports = {
  set,
  get,
  list,
};