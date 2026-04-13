const sequelize = require('./config/database');
const User = require('./models/User');

async function test() {
    await sequelize.authenticate();
    const users = await User.findAll({ order: [['id', 'DESC']], limit: 1 });
    users.forEach(u => console.log(`[ID: ${u.id}] [Email: ${u.email}] [Phone: ${u.phone}]`));
}
test().catch(console.error);
