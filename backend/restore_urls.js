const Product = require('./models/Product');
const sequelize = require('./config/database');

const originalData = [
  { name: "Bleu de Chanel", imageUrl: "https://www.chanel.com/images//t_one/t_step1/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_840/bleu-de-chanel-eau-de-parfum-spray-3-4fl-oz--packshot-default-107360-9539151593502.jpg" },
  { name: "Sauvage", imageUrl: "https://images.dior.com/3d/swatch/fragrance/sauvage/Y0685240-sauvage.jpg" },
  { name: "Gucci Bloom", imageUrl: "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1568222703/488830_99999_0099_001_100_0000_Light-Eau-de-Parfum-Gucci-Bloom-100-ml.jpg" },
  { name: "Prada L'Homme", imageUrl: "https://www.prada.com/content/dam/pradanux_products/1/1A1/1A1175/2HD0XPF0Z99/1A1175_2HD0_XPF_0Z99_SLF.png" },
  { name: "Oud Wood", imageUrl: "https://www.fragrancex.com/images/products/sku/large/tofp5m.jpg" },
  { name: "Aventus", imageUrl: "https://creedboutique.com/cdn/shop/files/Aventus-50_db86bede-6483-4a11-85e6-ee306ee1cf2d.jpg" },
  { name: "La Vie Est Belle", imageUrl: "https://www.sephora.com/productimages/sku/s1449297-main-zoom.jpg" },
  { name: "Eros", imageUrl: "https://www.sephora.com/productimages/sku/s1499538-main-zoom.jpg" },
  { name: "Si", imageUrl: "https://www.sephora.com/productimages/sku/s1577771-main-zoom.jpg" },
  { name: "Black Opium", imageUrl: "https://www.sephora.com/productimages/sku/s1677324-main-zoom.jpg" },
  { name: "1 Million", imageUrl: "https://www.sephora.com/productimages/sku/s1132711-main-zoom.jpg" },
  { name: "Omnia Crystalline", imageUrl: "https://www.sephora.com/productimages/sku/s882779-main-zoom.jpg" },
  { name: "Terre d'Hermès", imageUrl: "https://www.sephora.com/productimages/sku/s1017847-main-zoom.jpg" }
];

const restoreUrls = async () => {
  await sequelize.authenticate();
  for (let data of originalData) {
    const p = await Product.findOne({ where: { name: data.name } });
    if (p) {
      p.imageUrl = data.imageUrl;
      await p.save();
    }
  }
  console.log('Restored URLs for international brands.');
  process.exit(0);
};

restoreUrls();
