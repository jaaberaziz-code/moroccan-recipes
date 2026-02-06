const fs = require('fs');
const path = require('path');

// Load recipes
const recipesPath = path.join(__dirname, 'data', 'recipes.json');
const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));

// Function to translate French to Arabic (basic mapping for common terms)
const TRANSLATIONS = {
  // Recipe types
  'Tajine': 'طاجين',
  'tajine': 'طاجين',
  'Couscous': 'كسكس',
  'couscous': 'كسكس',
  'Harira': 'حريرة',
  'harira': 'حريرة',
  'Briouate': 'بريوات',
  'briouate': 'بريوات',
  'Brick': 'بريك',
  'brick': 'بريك',
  'Pastilla': 'بسطيلة',
  'pastilla': 'بسطيلة',
  'Salade': 'سلطة',
  'salade': 'سلطة',
  'Soupe': 'شوربة',
  'soupe': 'شوربة',
  'Kefta': 'كفتة',
  'kefta': 'كفتة',
  'Msemen': 'مسمن',
  'msemen': 'مسمن',
  'Baghrir': 'بغرير',
  'baghrir': 'بغرير',
  'Chebakia': 'شباكية',
  'chebakia': 'شباكية',
  'Cornes de gazelle': 'قرن غزال',
  'Makrout': 'مقروط',
  'makrout': 'مقروط',
  'Basboussa': 'بسبوسة',
  'basboussa': 'بسبوسة',
  'Rfissa': 'رفيسة',
  'rfissa': 'رفيسة',
  'Chakchouka': 'شكشوكة',
  'chakchouka': 'شكشوكة',
  
  // Proteins
  'poulet': 'دجاج',
  'Poulet': 'دجاج',
  'viande': 'لحم',
  'Viande': 'لحم',
  'boeuf': 'بقر',
  'Boeuf': 'بقر',
  'agneau': 'خروف',
  'Agneau': 'خروف',
  'mouton': 'خروف',
  'Mouton': 'خروف',
  'poisson': 'سمك',
  'Poisson': 'سمك',
  'thon': 'تونة',
  'Thon': 'تونة',
  'merguez': 'مرقاز',
  'Merguez': 'مرقاز',
  
  // Vegetables
  'legumes': 'خضار',
  'légumes': 'خضار',
  'Légumes': 'خضار',
  'carotte': 'جزر',
  'Carotte': 'جزر',
  'carottes': 'جزر',
  'Carottes': 'جزر',
  'pomme de terre': 'بطاطس',
  'Pomme de terre': 'بطاطس',
  'pommes de terre': 'بطاطس',
  'courgette': 'كوسة',
  'Courgette': 'كوسة',
  'courgettes': 'كوسة',
  'aubergine': 'باذنجان',
  'Aubergine': 'باذنجان',
  'aubergines': 'باذنجان',
  'poivron': 'فلفل',
  'Poivron': 'فلفل',
  'poivrons': 'فلفل',
  'tomate': 'طماطم',
  'Tomate': 'طماطم',
  'tomates': 'طماطم',
  'oignon': 'بصل',
  'Oignon': 'بصل',
  'oignons': 'بصل',
  'ail': 'ثوم',
  'Ail': 'ثوم',
  'navet': 'لفت',
  'Navet': 'لفت',
  'chou': 'كرنب',
  'Chou': 'كرنب',
  'epinard': 'سبانخ',
  'épinard': 'سبانخ',
  'Épinard': 'سبانخ',
  
  // Other ingredients
  'citron': 'ليمون',
  'Citron': 'ليمون',
  'citron confit': 'ليمون مخلل',
  'citrons confits': 'ليمون مخلل',
  'olive': 'زيتون',
  'Olive': 'زيتون',
  'olives': 'زيتون',
  'amande': 'لوز',
  'Amande': 'لوز',
  'amandes': 'لوز',
  'datte': 'تمر',
  'Datte': 'تمر',
  'dattes': 'تمر',
  'raisins secs': 'زبيب',
  'Raisins secs': 'زبيب',
  'pignon': 'صنوبر',
  'Pignon': 'صنوبر',
  'pignons': 'صنوبر',
  'miel': 'عسل',
  'Miel': 'عسل',
  'semoule': 'سميد',
  'Semoule': 'سميد',
  'farine': 'دقيق',
  'Farine': 'دقيق',
  'beurre': 'زبدة',
  'Beurre': 'زبدة',
  'huile': 'زيت',
  'Huile': 'زيت',
  'huile d\'olive': 'زيت الزيتون',
  'lait': 'حليب',
  'Lait': 'حليب',
  'oeuf': 'بيض',
  'Oeuf': 'بيض',
  'oeufs': 'بيض',
  'Œuf': 'بيض',
  'Œufs': 'بيض',
  'sucre': 'سكر',
  'Sucre': 'سكر',
  'sel': 'ملح',
  'Sel': 'ملح',
  'poivre': 'فلفل أسود',
  'Poivre': 'فلفل أسود',
  
  // Spices
  'cumin': 'كمون',
  'Cumin': 'كمون',
  'cannelle': 'قرفة',
  'Cannelle': 'قرفة',
  'gingembre': 'زنجبيل',
  'Gingembre': 'زنجبيل',
  'curcuma': 'كركم',
  'Curcuma': 'كركم',
  'safran': 'زعفران',
  'Safran': 'زعفران',
  'paprika': 'بابريكا',
  'Paprika': 'بابريكا',
  'ras el hanout': 'راس الحانوت',
  'Ras el hanout': 'راس الحانوت',
  'Ras-el-hanout': 'راس الحانوت',
  'harissa': 'هريسة',
  'Harissa': 'هريسة',
  'coriandre': 'كزبرة',
  'Coriandre': 'كزبرة',
  'persil': 'معدنوس',
  'Persil': 'معدنوس',
  'menthe': 'نعناع',
  'Menthe': 'نعناع',
  
  // Cooking terms
  'à la marocaine': 'على الطريقة المغربية',
  'marocaine': 'مغربية',
  'Marocaine': 'مغربية',
  'marocain': 'مغربي',
  'Marocain': 'مغربي',
  'traditionnel': 'تقليدي',
  'traditionnelle': 'تقليدية',
  'farcie': 'محشو',
  'farcies': 'محشوة',
  'facile': 'سهل',
  'Facile': 'سهل',
  'rapide': 'سريع',
  'Rapide': 'سريع',
  
  // Appliances
  'au four': 'في الفرن',
  'au Cookeo': 'في الكوكو',
  'au Thermomix': 'في الثرمومكس',
  'au Monsieur Cuisine': 'في مونسيور كوزين',
  
  // Others
  'végétarien': 'نباتي',
  'Végétarien': 'نباتي',
  'végétarienne': 'نباتية',
  'express': 'سريع',
  'Express': 'سريع',
  'royal': 'ملكي',
  'Royal': 'ملكي',
  'de ma grand-mère': 'على طريقة جدتي',
  'sans gluten': 'بدون غلوتين',
  'au citron': 'بالليمون',
  'aux olives': 'بالزيتون',
  'aux légumes': 'بالخضار',
  'aux amandes': 'باللوز',
  'aux dattes': 'بالتمر',
  'au thon': 'بالتونة',
  'au poulet': 'بالدجاج',
  'au boeuf': 'باللحم البقري',
  'à l\'agneau': 'بالخروف',
  'au miel': 'بالعسل',
  'à la viande': 'باللحم',
  'à la coriandre': 'بالكزبرة',
};

// Simple translation function
function translateToArabic(text) {
  if (!text) return '';
  let translated = text;
  
  // Replace known terms
  for (const [fr, ar] of Object.entries(TRANSLATIONS)) {
    translated = translated.replace(new RegExp(fr, 'gi'), ar);
  }
  
  // Keep original if mostly unchanged (not fully translated)
  // Return with Arabic hint
  return translated;
}

// Translate a recipe
function translateRecipe(recipe) {
  const translated = { ...recipe };
  
  // Translate title
  if (!translated.titleAr) {
    translated.titleAr = translateToArabic(translated.title);
  }
  
  // Translate category
  const categoryMap = {
    'Soup': 'شوربة',
    'Main Course': 'طبق رئيسي',
    'Dessert': 'حلويات',
    'Salad': 'سلطة',
    'Appetizer': 'مقبلات',
    'Breakfast': 'فطور',
    'Side Dish': 'طبق جانبي',
    'Other': 'أخرى'
  };
  if (!translated.categoryAr) {
    translated.categoryAr = categoryMap[translated.category] || translated.category;
  }
  
  // Translate difficulty
  const difficultyMap = {
    'Easy': 'سهل',
    'Medium': 'متوسط',
    'Hard': 'صعب'
  };
  if (!translated.difficultyAr) {
    translated.difficultyAr = difficultyMap[translated.difficulty] || translated.difficulty;
  }
  
  // Translate ingredients (simple mapping)
  if (!translated.ingredientsAr || translated.ingredientsAr.length === 0) {
    translated.ingredientsAr = translated.ingredients.map(ing => translateToArabic(ing));
  }
  
  // Translate instructions (simple mapping)
  if (!translated.instructionsAr || translated.instructionsAr.length === 0) {
    translated.instructionsAr = translated.instructions.map(inst => translateToArabic(inst));
  }
  
  return translated;
}

// Find recipes needing translation
const needsTranslation = recipes.filter(r => !r.titleAr || !/[\u0600-\u06FF]/.test(r.titleAr));

console.log(`Found ${needsTranslation.length} recipes to translate`);
console.log('Starting batch translation...\n');

// Translate in batches
const BATCH_SIZE = 10;
let translatedCount = 0;

for (let i = 0; i < needsTranslation.length; i += BATCH_SIZE) {
  const batch = needsTranslation.slice(i, i + BATCH_SIZE);
  
  batch.forEach(recipe => {
    const idx = recipes.findIndex(r => r.id === recipe.id);
    if (idx !== -1) {
      recipes[idx] = translateRecipe(recipe);
      translatedCount++;
      console.log(`✓ ${translatedCount}. ${recipes[idx].titleAr} (${recipe.title})`);
    }
  });
}

// Save
fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2));

console.log(`\n✅ Translated ${translatedCount} recipes!`);
console.log(`💾 Saved to ${recipesPath}`);
console.log('\n⚠️  Note: This is a basic translation.');
console.log('📝 Please review and improve translations in the dashboard.');
