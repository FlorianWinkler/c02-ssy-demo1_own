const Loki = require("lokijs");
const User = require('./User');

const db = new Loki('demo.json');
const users = db.addCollection('users');

users.insert(new User('Sleipnir', 8, "red"));
users.insert(new User('Jormungandr', 0, "green"));
users.insert(new User('Hel', 2, "blue"));

module.exports = db;