const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  totalAmount: {
    type: DataTypes.DECIMAL,
  },
  orderDetails: {
    type: DataTypes.STRING(2000),
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING'
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'orders',
  timestamps: false,
});

Order.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false } });
User.hasMany(Order, { foreignKey: 'user_id' });

module.exports = Order;
