const Sequelize = require('sequelize');
const dbconn = require('../util/database');

const CartItem = dbconn.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  size: {
    type: Sequelize.ENUM('S','M','L','XL','XXL'),
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = CartItem;