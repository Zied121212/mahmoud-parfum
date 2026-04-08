const Product = require('./models/Product');
const sequelize = require('./config/database');

const translations = {
  "Oud Royal": {
    nameAr: "عود ملكي",
    notesAr: "عود، جلد، زعفران",
    descriptionAr: "نسخة حديثة من سحر الشرق مصممة بشكل مهيب كتحية للعود، المكون الأكثر فخامة.",
    componentsAr: "خشب العود الأصلي, زعفران إيراني, جلد فاخر"
  },
  "Bois de Nuit": {
    nameAr: "خشب الليل",
    notesAr: "خشب الصندل، خشب الأرز، نجيل الهند",
    descriptionAr: "عبير قوي وخشبي يستمد قوته من سحر الليل الصامت.",
    componentsAr: "خشب الصندل الميسوري, خشب الأرز الأطلسي"
  },
  "Cuir Sombre": {
    nameAr: "جلد داكن",
    notesAr: "جلد، حبهان، خشب الأرز",
    descriptionAr: "تعاطٍ مكثف وداكن للجلد مع لمسات حارة غير متوقعة.",
    componentsAr: "أصلي, حب الهيل, خشب الأرز"
  },
  "Ambre Impérial": {
    nameAr: "عنبر إمبراطوري",
    notesAr: "عنبر، بخور، باتشولي",
    descriptionAr: "عنبر دافئ بلمسات البخور والباتشولي لتوقيع ذكوري قوي.",
    componentsAr: "عنبر, بخور عُماني, إبرة الراعي"
  },
  "Vétiver Pamplemousse": {
    nameAr: "فيتيفير جريب فروت",
    notesAr: "نجيل الهند، جريب فروت، فلفل أسود",
    descriptionAr: "انفجار حمضي ونظيف من الجريب فروت ممتزج بعمق نجيل الهند.",
    componentsAr: "نجيل الهند الهايتي, جريب فروت إيطالي"
  },
  "Rose de Damas": {
    nameAr: "ورد دمشق",
    notesAr: "ورد، فاوانيا، مسك",
    descriptionAr: "تكريم رقيق للورد الدمشقي الشهير.",
    componentsAr: "خلاصة الورد الدمشقي, فاوانيا زهرية, مسك أبيض"
  },
  "Fleur de Jasmin": {
    nameAr: "زهرة الياسمين",
    notesAr: "ياسمين، فانيليا، خشب الصندل",
    descriptionAr: "عطر مشرق يستحضر حقلاً من الياسمين تحت أشعة الشمس البديعة.",
    componentsAr: "ياسمين هندي, فانيليا مدغشقر, خشب الصندل الميسوري"
  },
  "Vanille Exquise": {
    nameAr: "فانيليا رائعة",
    notesAr: "فانيليا، كراميل، مسك أبيض",
    descriptionAr: "فانيليا ناعمة وحلوة بعبير جورماند يسحر العقول.",
    componentsAr: "فانيليا بوربون المطلقة, كراميل زبدي, مسك الحرير"
  },
  "Iris Poudré": {
    nameAr: "سوسن بودري",
    notesAr: "سوسن، بنفسج، حجر الدم",
    descriptionAr: "تكوين فاخر وناعم برائحة البودرة الكلاسيكية الأنيقة.",
    componentsAr: "جذور السوسن الفلورنسي, أزهار البنفسج, حجر الدم"
  },
  "Néroli Soleil": {
    nameAr: "نيرولي مشمس",
    notesAr: "زهر البرتقال، برغموت، مسك",
    descriptionAr: "انعكاس مشرق لصيف البحر الأبيض المتوسط الذي لا ينتهي.",
    componentsAr: "دائمة من تونس, برغموت كالابريا, مسك أبيض"
  },
  "Élixir d'Or": {
    nameAr: "إكسير الذهب",
    notesAr: "زعفران، عنبر، فانيليا",
    descriptionAr: "رحلة من الترف من خلال التوابل المبهرة بلمسات الذهب الدافئة.",
    componentsAr: "زعفران كشمير, عنبر صلب, فانيليا مدغشقر"
  },
  "Santal Blanc": {
    nameAr: "صندل أبيض",
    notesAr: "خشب الصندل، حليب التين، مسك",
    descriptionAr: "عطر مهدئ بنعومة الكريم يحتفي بخيرات خشب الصندل الأبيض.",
    componentsAr: "خشب الصندل האוסטרلي, مستخلص حليب التين, مسك قطني"
  },
  "Bergamote Intense": {
    nameAr: "برغموت مركز",
    notesAr: "برغموت، ليمون، خشب الأرز",
    descriptionAr: "حمضيات نابضة بالحياة وحيوية ترتكز على طابع خشبي أنيق.",
    componentsAr: "برغموت كالابريا, ليمون صقلي, خشب الأرز من فرجينيا"
  },
  "Thé Noir & Épices": {
    nameAr: "شاي أسود وتوابل",
    notesAr: "شاي أسود، قرنفل، تبغ",
    descriptionAr: "مزيج غامض وغامق بنفحات الشاي المتبلة التي تحفز الحواس.",
    componentsAr: "أوراق الشاي الأسود, قرنفل ملغاشي, خلاصة التبغ"
  },
  "Musc Boréal": {
    nameAr: "مسك شمالي",
    notesAr: "مسك، صنوبر، زنابق الوادي",
    descriptionAr: "نسمة نقية وطازجة تستحضر جمال الشفق القطبي المذهل.",
    componentsAr: "مسك الجليد, صنوبر سيبيري, زنابق الوادي المطلقة"
  }
};

(async () => {
  await sequelize.authenticate();
  await Product.sync({ alter: true }); // ensure schema is created before updating
  const products = await Product.findAll();
  
  for (const product of products) {
    if (translations[product.name]) {
      const tr = translations[product.name];
      product.nameAr = tr.nameAr;
      product.notesAr = tr.notesAr;
      product.descriptionAr = tr.descriptionAr;
      product.componentsAr = tr.componentsAr;
      await product.save();
    }
  }
  console.log("Translations seeded successfully!");
  process.exit(0);
})();
