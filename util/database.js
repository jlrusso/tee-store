const Sequelize = require('sequelize');

const dbconn = new Sequelize('tee-store', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3307
});

module.exports = dbconn;