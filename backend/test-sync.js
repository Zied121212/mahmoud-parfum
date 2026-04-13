const sequelize = require('./config/database');
const User = require('./models/User');

async function syncDB() {
    console.log("Authenticating...");
    await sequelize.authenticate();
    console.log("Syncing database...");
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
}
syncDB().catch(console.error);
