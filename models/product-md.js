const Sequelize = require('sequelize');
const dbconn = require('../util/database');

const Product = dbconn.define('product', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  front_image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  back_image: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;