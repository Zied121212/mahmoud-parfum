const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  message: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'notifications',
  timestamps: false,
});

Notification.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false } });
User.hasMany(Notification, { foreignKey: 'user_id' });

module.exports = Notification;
