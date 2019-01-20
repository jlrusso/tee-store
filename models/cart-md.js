const Sequelize = require('sequelize');
const dbconn = require('../util/database');

const Cart = dbconn.define('cart', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4
  }
});

module.exports = Cart;