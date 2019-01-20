const Sequelize = require('sequelize');
const dbconn = require('../util/database');

const Order = dbconn.define('order', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  }
});

module.exports = Order;