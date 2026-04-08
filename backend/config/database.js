const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('mahmoud_parfum', 'postgres', 'postgre', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false, // Set to console.log to see SQL output
});
module.exports = sequelize;
