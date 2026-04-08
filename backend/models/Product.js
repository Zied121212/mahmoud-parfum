const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  nameAr: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING(1000),
  },
  descriptionAr: {
    type: DataTypes.STRING(1000),
  },
  price: {
    type: DataTypes.DECIMAL,
  },
  price100ml: {
    type: DataTypes.DECIMAL,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.STRING,
  },
  notesAr: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  brand: {
    type: DataTypes.STRING,
  },
  brandAr: {
    type: DataTypes.STRING,
  },
  components: {
    type: DataTypes.STRING,
  },
  componentsAr: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'products',
  timestamps: false,
});

module.exports = Product;
