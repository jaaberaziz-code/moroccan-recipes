const fs = require('fs');
const recipes = JSON.parse(fs.readFileSync('data/recipes.json', 'utf8'));

// Comprehensive French to Arabic translations
const TRANSLATIONS = {
  // Main dishes
  'Tajine de poisson à la marocaine': 'طاجين السمك المغربي',
  'Brick de viande hâchée à la marocaine': 'بريك بالكفتة',
  'Chorba à la marocaine': 'شوربة مغربية',
  'Cornes de gazelle marocaines de ma grand-mère': 'قرن الغزال على طريقة جدتي',
  'Tajine kefta œuf': 'طاجين كفتة بالبيض',
  'Couscous aux légumes surgelés au Cookeo': 'كسكس بالخضر المجمدة',
  'Gigot d\'agneau à la marocaine': 'فخذ الخروف المغربي',
  'Tajine de poulet à la marocaine': 'طاجين الدجاج المغربي',
  'Couscous aux boulettes de viande de boeuf': 'كسكس بكفتة البقر',
  'Tajine de légumes au four': 'طاجين الخضار في الفرن',
  'kefta a la marocaine': 'كفتة مغربية',
  'Jarret de boeuf à la marocaine': 'عظم البقر المغربي',
  'Epaule d\'agneau à la marocaine': 'كتف الخروف المغربي',
  'Couscous au boeuf': 'كسكس بالبقر',
  'crêpes à la marocaine': 'بغرير مغربي',
  'Tajine poulet-merguez': 'طاجين دجاج ومرقاز',
  'Tajine de poulet aux citrons confits et olives': 'طاجين الدجاج بالحامض المسكر والزيتون',
  'Tajine d\'agneau aux légumes': 'طاجين الخروف بالخضار',
  'Salade pomme de terre thon à la marocaine': 'سلطة البطاطس والتونة',
  'Carottes râpées à la marocaine': 'سلطة الجزر المبشور',
  'Tajine de veau aux olives': 'طاجين العجل بالزيتون',
  'Pastilla de poulet': 'بسطيلة بالدجاج',
  'Chtitha djedj': 'شطيطحة الدجاج',
  'Lentilles à la marocaine': 'عدس مغربي',
  'Kefta à la marocaine': 'كفتة مغربية',
  'Chakchouka aux merguez': 'شكشوكة بالمرقاز',
  'Gâteau algérien basboussa': 'بسبوسة جزائرية',
  'Couscous aux sept légumes': 'كسكس بسبعة خضار',
  'Tourte marocaine': 'تورتة مغربية',
  'Sardines à la marocaine': 'السردين المغربي',
  'Brick aux épinards et à la viande hachée': 'بريك بالسبانخ والكفتة',
  'Lentilles à la marocaine au Cookeo': 'عدس مغربي في الكوكو',
  'Poulet aux pruneaux': 'دجاج بالبرقوق',
  'Boules à la noix de coco à la Marocaine': 'كويرات جوز الهند',
  'Citrons confits à la marocaine': 'حامض مسكر مغربي',
  'Tajine de cuisses de poulet à la marocaine': 'طاجين فخاد الدجاج',
  'Poulet épicé à marocaine': 'دجاج حار مغربي',
  'Tajine de poulet marocain au Monsieur Cuisine': 'طاجين الدجاج في مونسيور كوزين',
  'Msemen farci au four': 'مسمن محشي في الفرن',
  'Pastilla marocaine au poulet': 'بسطيلة مغربية بالدجاج',
  'Sauce marocaine au foie de veau': 'صلصة كبد العجل',
  'Salade marocaine de pois chiches et tomates': 'سلطة الحمص والطماطم',
  'Salade carottes - pommes de terre à la marocaine': 'سلطة الجزر والبطاطس',
  'crêpes marocaines': 'كريب مغربي',
  'Souris d\'agneau à la marocaine': 'سواعد الخروف المغربية',
  'Boulettes de viande à la marocaine': 'كفتة مغربية',
  'Dorade au four à la marocaine': 'الدوراد في الفرن',
  'Cornes de gazelle marocaines à la fleur d\'oranger': 'قرن الغزال بماء الزهر',
  'Sauce marocaine': 'صلصة مغربية',
  'Soupe de légumes marocaine': 'شوربة الخضار المغربية',
  'Galette de pomme de terre marocaine': 'معقودة البطاطس',
  'Couscous au boeuf et légumes à la marocaine': 'كسكس البقر والخضار',
  'Brioche marocaine': 'بريوش مغربي',
  'Collier d\'agneau aux tomates et paprika': 'عنق الخروف بالطماطم والبابريكا',
  'Coquelets marinés à la marocaine': 'دجاج صغير متبل',
  'Tajine de mouton à la marocaine': 'طاجين المشماش',
  'Pastilla au poulet, courgettes et cumin': 'بسطيلة بالدجاج والكوسة والكمون',
  'Salade de carottes marocaine': 'سلطة الجزر المغربية',
  'Tajine végétarien aux aubergines': 'طاجين نباتي بالباذنجان',
  'Spaghettis à la marocaine': 'سباغيتي مغربية',
  'Salade de pommes de terre à la marocaine': 'سلطة البطاطس المغربية',
  'Soupe marocaine de lentilles rouges': 'شوربة العدس الأحمر',
  'Basboussa au lait concentré sucré': 'بسبوسة بالحليب المركز',
  'Taktouka du Maroc': 'تكتكة مغربية',
  'Carottes à la marocaine': 'الجزر المغربي',
  'Tajine végétarien aux pois-chiches': 'طاجين نباتي بالحمص',
  'Chevreau à la marocaine': 'جدي مغربي',
  'Corne de gazelle sans gluten': 'قرن الغزال بدون غلوتين',
  'Tchoutchouka au Thermomix': 'تشوتشوكة في الثرمومكس',
  'Pastilla aux fruits de mer': 'بسطيلة فواكه البحر',
  'Couscous express': 'كسكس سريع',
  'Chakchouka au Monsieur Cuisine': 'شكشوكة في مونسيور كوزين',
  'Msemen au Kitchenaid': 'مسمن في كيتشين ايد',
  'Ragoût de poisson à la marocaine': 'طبق السمك المغربي',
  'Mhancha salée à la viande hachée': 'حنشة بالكفتة',
  'Ratatouille au couscous façon marocaine': 'راتاتوي بالكسكس المغربي',
  'Les fazuelos, pâtisseries marocaines': 'فازويلوس حلويات مغربية',
  'Corne de gazelle à la cacahuète': 'قرن الغزال بالكاوكاو',
  'Tajine d\'agneau aux haricots verts': 'طاجين الخروف بالفاصوليا',
  'Sauté d\'agneau à la Marocaine': 'صوابع الخروف المغربية',
  'Paëlla à la marocaine': 'بايلا مغربية',
  'Tajine de porc au Cookeo': 'طاجين الخنزير في الكوكو',
  'Côtes d\'agneau marinées au citron': 'ضلع الخروف المتبل بالليمون',
  'Artichauts farcis à la Marocaine': 'خرشوف محشي مغربي',
  'Brochettes de dinde épicées à la marocaine': 'سيخ الديك الرومي الحار',
  'Tajine de lotte au Cookeo': 'طاجين الحوت في الكوكو',
  'Ebly à la marocaine': 'إبلي مغربي',
  'Soupe marocaine (harira)': 'شوربة مغربية (حريرة)',
  'Tajine de légumes': 'طاجين الخضار',
  'Tajine d\'agneau aux coings': 'طاجين الخروف بالسفرجل',
  'Basboussa à la chapelure': 'بسبوسة بالفتات',
  'Tajine de crevettes aux epices': 'طاجين القريدس بالتوابل',
  'Brochettes de Keftas à la marocaine': 'سيخ الكفتة المغربية',
  'Aaubergines à la marocaine': 'باذنجان مغربي',
  'Bsissa marocaine': 'بسيسة مغربية',
  'crêpes marocaines au miel': 'كريب مغربي بالعسل',
  'Salade de betteraves d\'inspiration marocaine': 'سلطة الشمندر المغربية',
  'Salade marocaine': 'سلطة مغربية',
  'Petits farcis à la marocaine': 'محشيات صغيرة مغربية',
  'Courge butternut à la marocaine': 'قرع الباترنات المغربي',
  'Tajine à l\'agneau, citron et olives': 'طاجين الخروف بالليمون والزيتون',
  'Seffa à la noix de coco': 'سفة بجوز الهند',
  'Tajine de nèfles farcies aux amandes': 'طاجين الزعرور باللوز',
  'Confit de boeuf à la marocaine': 'لحم البقر المطهي',
  'Harira (soupe marocaine)': 'حريرة (شوربة مغربية)',
  'La mrozilla, confiture marocaine': 'مروزية مربى مغربي',
  'Tomates confites à la marocaine': 'طماطم مجففة مغربية',
  'crêpes Marocaines baghrir': 'بغرير مغربي',
  'Tajine de lotte marocaine aux olives Kalimata': 'طاجين الحوت بزيتون كالاماتا',
  'Faisselles saveurs marocaines': 'جبن طري بنكهات مغربية',
  'Le Maroc': 'المغرب',
  'Thon à la marocaine de Nissrine': 'تونة نيسرين المغربية',
  'Baghrire à la marocaine': 'بغرير مغربي',
  
  // Generic terms
  'à la marocaine': 'على الطريقة المغربية',
  'marocaine': 'مغربية',
  'marocain': 'مغربي',
  'au four': 'في الفرن',
  'au Cookeo': 'في الكوكو',
  'au Thermomix': 'في الثرمومكس',
  'au Monsieur Cuisine': 'في مونسيور كوزين',
  'au citron': 'بالليمون',
  'aux olives': 'بالزيتون',
  'aux légumes': 'بالخضار',
  'aux amandes': 'باللوز',
  'aux dattes': 'بالتمر',
  'au thon': 'بالتونة',
  'au poulet': 'بالدجاج',
  'à l\'agneau': 'بالخروف',
  'au boeuf': 'بالبقر',
  'au miel': 'بالعسل',
  'à la viande': 'باللحم',
  'à la coriandre': 'بالكزبرة',
  'sans gluten': 'بدون غلوتين',
  'de ma grand-mère': 'على طريقة جدتي',
  'facile': 'سهل',
  'express': 'سريع',
  'traditionnel': 'تقليدي',
  'traditionnelle': 'تقليدية',
};

// Function to translate a title
function translateTitle(title) {
  // Direct match
  if (TRANSLATIONS[title]) return TRANSLATIONS[title];
  
  // Try to build translation from parts
  let translated = title;
  
  // Replace known phrases
  for (const [fr, ar] of Object.entries(TRANSLATIONS)) {
    if (title.includes(fr)) {
      translated = translated.replace(new RegExp(fr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), ar);
    }
  }
  
  // If still mostly French, return with Arabic suffix
  if (!/[\u0600-\u06FF]/.test(translated)) {
    return translated + ' (ترجمة مطلوبة)';
  }
  
  return translated;
}

// Find recipes needing translation
let translated = 0;
const needsTranslation = recipes.filter(r => !r.titleAr || !/[\u0600-\u06FF]/.test(r.titleAr));

console.log(`Found ${needsTranslation.length} recipes to translate\n`);

needsTranslation.forEach((recipe, idx) => {
  const recipeIdx = recipes.findIndex(r => r.id === recipe.id);
  if (recipeIdx !== -1) {
    const arTitle = translateTitle(recipe.title);
    recipes[recipeIdx].titleAr = arTitle;
    
    // Also translate category and difficulty if needed
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
    
    const difficultyMap = {
      'Easy': 'سهل',
      'Medium': 'متوسط',
      'Hard': 'صعب'
    };
    
    if (!recipes[recipeIdx].categoryAr) {
      recipes[recipeIdx].categoryAr = categoryMap[recipes[recipeIdx].category] || recipes[recipeIdx].category;
    }
    if (!recipes[recipeIdx].difficultyAr) {
      recipes[recipeIdx].difficultyAr = difficultyMap[recipes[recipeIdx].difficulty] || recipes[recipeIdx].difficulty;
    }
    
    translated++;
    console.log(`${translated}. ${arTitle}`);
  }
});

// Save
fs.writeFileSync('data/recipes.json', JSON.stringify(recipes, null, 2));

console.log(`\n✅ Translated ${translated} recipes!`);
console.log(`📊 Total Arabic: ${recipes.filter(r => r.titleAr && /[\u0600-\u06FF]/.test(r.titleAr)).length}/${recipes.length}`);
