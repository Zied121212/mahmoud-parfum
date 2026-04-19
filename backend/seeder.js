const Product = require('./models/Product');

const initialProducts = [
  {
    name: "Bleu de Chanel",
    nameAr: "بلو دي شانيل",
    description: "Une fragrance aromatique boisée, profonde et mystérieuse.",
    descriptionAr: "عطر خشبي عطري، عميق وغامض.",
    price: 450,
    price100ml: 650,
    imageUrl: "https://www.chanel.com/images//t_one/t_step1/q_auto:good,f_auto,fl_lossy,dpr_1.2/w_840/bleu-de-chanel-eau-de-parfum-spray-3-4fl-oz--packshot-default-107360-9539151593502.jpg",
    notes: "Citron, Pamplemousse, Menthe",
    notesAr: "ليمون، جريب فروت، نعناع",
    category: "Homme",
    brand: "Chanel",
    brandAr: "شانيل",
    components: "Cèdre, Bois de Santal, Gingembre",
    componentsAr: "خشب الأرز، خشب الصندل، زنجبيل"
  },
  {
    name: "Sauvage",
    nameAr: "سوفاج",
    description: "Une composition radicalement fraîche, dictée par un nom qui sonne comme un manifeste.",
    descriptionAr: "تركيبة منعشة جذرياً، يمليها اسم يتردد كبيان.",
    price: 480,
    price100ml: 680,
    imageUrl: "https://images.dior.com/3d/swatch/fragrance/sauvage/Y0685240-sauvage.jpg",
    notes: "Bergamote de Reggio, Poivre de Sichuan",
    notesAr: "برغموت ريجيو، فلفل سيتشوان",
    category: "Homme",
    brand: "Dior",
    brandAr: "ديور",
    components: "Ambroxan, Élémi, Patchouli",
    componentsAr: "أمبروكسان، إيليمي، باتشولي"
  },
  {
    name: "Gucci Bloom",
    nameAr: "غوتشي بلوم",
    description: "Capturant l'esprit contemporain, varié et authentique des femmes Gucci.",
    descriptionAr: "يأسر الروح المعاصرة والمتنوعة والأصيلة لنساء غوتشي.",
    price: 520,
    price100ml: 720,
    imageUrl: "https://media.gucci.com/style/DarkGray_Center_0_0_800x800/1568222703/488830_99999_0099_001_100_0000_Light-Eau-de-Parfum-Gucci-Bloom-100-ml.jpg",
    notes: "Jasmin, Tubéreuse, Rangoon Creeper",
    notesAr: "ياسمين، مسك الروم، زاحف رانغون",
    category: "Femme",
    brand: "Gucci",
    brandAr: "غوتشي",
    components: "Racine d'Iris, Chèvrefeuille",
    componentsAr: "جذر السوسن، زهر العسل"
  },
  {
    name: "Prada L'Homme",
    nameAr: "برادا لوم",
    description: "Un parfum d'ambre vif et charismatique conçu pour l'homme classique mais contemporain.",
    descriptionAr: "عطر عنبر حيوي وجذاب مصمم للرجل الكلاسيكي والمعاصر.",
    price: 420,
    price100ml: 600,
    imageUrl: "https://www.prada.com/content/dam/pradanux_products/1/1A1/1A1175/2HD0XPF0Z99/1A1175_2HD0_XPF_0Z99_SLF.png",
    notes: "Néroli, Géranium, Patchouli",
    notesAr: "نيرولي، إبرة الراعي، باتشولي",
    category: "Homme",
    brand: "Prada",
    brandAr: "برادا",
    components: "Iris, Ambre, Cèdre",
    componentsAr: "سوسن، عنبر، خشب الأرز"
  },
  {
    name: "Oud Wood",
    nameAr: "عود وود",
    description: "Un parfum rare, exotique et distinctif avec la richesse des bois nobles.",
    descriptionAr: "عطر نادر، غريب ومميز بغنى الأخشاب النبيلة.",
    price: 850,
    price100ml: 1200,
    imageUrl: "https://www.fragrancex.com/images/products/sku/large/tofp5m.jpg",
    notes: "Bois de Rose, Cardamome, Poivre Chinois",
    notesAr: "خشب الورد، حبهان، فلفل صيني",
    category: "Unisexe",
    brand: "Tom Ford",
    brandAr: "توم فور",
    components: "Oud Rare, Santal, Vétiver",
    componentsAr: "عود نادر، خشب الصندل، فيتيفير"
  },
  {
    name: "Aventus",
    nameAr: "أفنتوس",
    description: "Célébrant la force, le pouvoir et le succès, Inspiré par l'histoire dramatique d'un empereur historique.",
    descriptionAr: "يحتفل بالقوة والسلطة والنجاح، مستوحى من القصة الدرامية لإمبراطور تاريخي.",
    price: 950,
    price100ml: 1500,
    imageUrl: "https://creedboutique.com/cdn/shop/files/Aventus-50_db86bede-6483-4a11-85e6-ee306ee1cf2d.jpg",
    notes: "Ananas, Bergamote, Pomme",
    notesAr: "أناناس، برغموت، تفاح",
    category: "Homme",
    brand: "Creed",
    brandAr: "كريد",
    components: "Bouleau, Musc, Mousse de Chêne",
    componentsAr: "بتولا، مسك، طحلب السنديان"
  },
  {
    name: "La Vie Est Belle",
    nameAr: "لا في إي بيل",
    description: "Une déclaration universelle à la beauté de la vie.",
    descriptionAr: "إعلان عالمي لجمال الحياة.",
    price: 460,
    price100ml: 650,
    imageUrl: "https://www.sephora.com/productimages/sku/s1449297-main-zoom.jpg",
    notes: "Cassis, Poire",
    notesAr: "كشمش أسود، كمثرى",
    category: "Femme",
    brand: "Lancôme",
    brandAr: "لانكوم",
    components: "Iris, Jasmin, Fleur d'Oranger",
    componentsAr: "سوسن، ياسمين، زهر البرتقال"
  },
  {
    name: "Eros",
    nameAr: "إيروس",
    description: "L'amour, la passion, la beauté et le désir.",
    descriptionAr: "الحب، الشغف، الجمال والرغبة.",
    price: 380,
    price100ml: 550,
    imageUrl: "https://www.sephora.com/productimages/sku/s1499538-main-zoom.jpg",
    notes: "Menthe, Pomme Verte, Citron",
    notesAr: "نعناع، تفاح أخضر، ليمون",
    category: "Homme",
    brand: "Versace",
    brandAr: "فيرساتشي",
    components: "Fève Tonka, Géranium, Ambroxan",
    componentsAr: "تونكا، إبرة الراعي، أمبروكسان"
  },
  {
    name: "Si",
    nameAr: "سي",
    description: "Chic, voluptueux, intense et doux à la fois.",
    descriptionAr: "أنيق، حسي، مكثف وناعم في نفس الوقت.",
    price: 490,
    price100ml: 690,
    imageUrl: "https://www.sephora.com/productimages/sku/s1577771-main-zoom.jpg",
    notes: "Nectar de Cassis",
    notesAr: "رحيق الكشمش الأسود",
    category: "Femme",
    brand: "Armani",
    brandAr: "أرماني",
    components: "Freesia, Rose de Mai, Musc",
    componentsAr: "فريزيا، ورد مايو، مسك"
  },
  {
    name: "Black Opium",
    nameAr: "بلاك أوبيوم",
    description: "Une dose d'adrénaline, pour une héroïne glamour et impertinente.",
    descriptionAr: "جرعة أدرينالين لبطولة متألقة وجريئة.",
    price: 510,
    price100ml: 710,
    imageUrl: "https://www.sephora.com/productimages/sku/s1677324-main-zoom.jpg",
    notes: "Poire, Poivre Rose, Fleur d'Oranger",
    notesAr: "كمثرى، فلفل وردي، زهر البرتقال",
    category: "Femme",
    brand: "Yves Saint Laurent",
    brandAr: "إيف سان لوران",
    components: "Café, Jasmin, Amande, Vanille",
    componentsAr: "قهوة، ياسمين، لوز، فانيليا"
  },
  {
    name: "1 Million",
    nameAr: "وان مليون",
    description: "Le parfum de l'insolence. Un cuir épicé insolent avec des notes fraîches.",
    descriptionAr: "عطر الجرأة. جلد حار جريء بنفحات منعشة.",
    price: 390,
    price100ml: 580,
    imageUrl: "https://www.sephora.com/productimages/sku/s1132711-main-zoom.jpg",
    notes: "Pamplemousse, Menthe, Mandarine Sanguine",
    notesAr: "جريب فروت، نعناع، يوسفي",
    category: "Homme",
    brand: "Paco Rabanne",
    brandAr: "باكو رابان",
    components: "Rose, Cannelle, Accord Cuiré",
    componentsAr: "ورد، قرفة، نفحات جلدية"
  },
  {
    name: "Omnia Crystalline",
    nameAr: "أومنيا كريستالين",
    description: "Capture l'éclat radieux du cristal avec une transparence lumineuse.",
    descriptionAr: "تلتقط الإشراق الساطع للكريستال بشفافية مضيئة.",
    price: 410,
    price100ml: 590,
    imageUrl: "https://www.sephora.com/productimages/sku/s882779-main-zoom.jpg",
    notes: "Bambou, Poire Asiatique",
    notesAr: "خيزران، كمثرى آسيوية",
    category: "Femme",
    brand: "Bvlgari",
    brandAr: "بلغاري",
    components: "Lotus, Thé, Musc, Bois de Gaïac",
    componentsAr: "لوتس، شاي، مسك، خشب الغاياك"
  },
  {
    name: "Terre d'Hermès",
    nameAr: "تيري دي هيرميس",
    description: "Raconte la relation de l'homme avec la terre, un dialogue de la nature.",
    descriptionAr: "يحكي علاقة الرجل بالأرض، حوار الطبيعة.",
    price: 470,
    price100ml: 660,
    imageUrl: "https://www.sephora.com/productimages/sku/s1017847-main-zoom.jpg",
    notes: "Orange, Pamplemousse",
    notesAr: "برتقال، جريب فروت",
    category: "Homme",
    brand: "Hermès",
    brandAr: "هيرميس",
    components: "Poivre, Pélargonium, Cèdre",
    componentsAr: "فلفل، بيلارجونيوم، خشب الأرز"
  }
];

const seedDatabase = async () => {
  try {
    const existingProduct = await Product.findOne({ where: { name: "Bleu de Chanel" } });
    if (!existingProduct) {
      console.log('Seeding initial brand products...');
      await Product.bulkCreate(initialProducts);
      console.log('Successfully seeded database with brand products!');
    } else {
      console.log('Products already exist. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;
