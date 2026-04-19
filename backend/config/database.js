const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: isProduction ? {
          require: true,
          rejectUnauthorized: false
        } : false
      }
    })
  : new Sequelize('mahmoud_parfum', 'postgres', 'postgre', {
      host: 'localhost',
      port: 5432,
      dialect: 'postgres',
      logging: false,
    });

module.exports = sequelize;

