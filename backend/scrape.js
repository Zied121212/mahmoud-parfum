const Product = require('./models/Product');
const sequelize = require('./config/database');

async function searchBing(query) {
  try {
    const res = await fetch(`https://www.bing.com/images/search?q=${encodeURIComponent(query + ' perfume flacon')}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
      }
    });
    const html = await res.text();
    const match = html.match(/murl&quot;:&quot;(.*?)&quot;/);
    if (match) {
      return match[1];
    }
  } catch (e) {
    console.error("Error for", query, e.message);
  }
  return null;
}

async function updateAllPhotos() {
  await sequelize.authenticate();
  const products = await Product.findAll();
  
  for (let p of products) {
    console.log(`Searching photo for: ${p.name}`);
    const url = await searchBing(p.name);
    if (url) {
      console.log(`Found: ${url}`);
      p.imageUrl = url;
      await p.save();
    } else {
      console.log("Not found.");
    }
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log("All updated!");
  process.exit(0);
}

updateAllPhotos();
