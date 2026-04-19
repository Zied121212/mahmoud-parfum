const Product = require('./models/Product');
const sequelize = require('./config/database');

const updateImages = async () => {
  await sequelize.authenticate();
  const products = await Product.findAll();

  let count = 0;
  for (let p of products) {
    const name = p.name.toLowerCase();
    const cat = p.category;

    if (name.includes('chanel') || name.includes('sauvage') || name.includes('hermès') || name.includes('1 million') || name.includes('vetiver')) {
      p.imageUrl = '/luxe/luxe_blue.png';
    } 
    else if (name.includes('bloom') || name.includes('belle') || name.includes('si') || name.includes('rose') || name.includes('fleur') || name.includes('omnia')) {
      p.imageUrl = '/luxe/luxe_floral.png';
    }
    else if (name.includes('oud') || name.includes('aventus') || name.includes('or') || name.includes('ambre') || name.includes('vanille')) {
      p.imageUrl = '/luxe/luxe_gold.png';
    }
    else {
      p.imageUrl = '/luxe/luxe_black.png';
    }

    await p.save();
    count++;
  }
  console.log(`Updated images for ${count} products.`);
  process.exit(0);
};

updateImages();
