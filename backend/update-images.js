const Product = require('./models/Product');
const sequelize = require('./config/database');

async function updateImages() {
  try {
    await sequelize.authenticate();
    const products = await Product.findAll();
    for (let p of products) {
      let url = '/images/luxe.png';
      if (p.category === 'Homme') url = '/images/homme.png';
      else if (p.category === 'Femme') url = '/images/femme.png';
      else if (p.category === 'Unisexe') url = '/images/unisexe.png';
      
      if (p.price > 400) url = '/images/luxe.png';
  
      p.imageUrl = url;
      await p.save();
    }
    console.log("Images updated successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

updateImages();
