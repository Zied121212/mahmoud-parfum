const Product = require('./models/Product');
const sequelize = require('./config/database');

async function seedPrices() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    const products = await Product.findAll();
    for (let p of products) {
      if (p.price) {
        // Multiply by 2 for 100ml price
        p.price100ml = (Number(p.price) * 2).toFixed(2);
        await p.save();
      }
    }
    console.log("Prices seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedPrices();
