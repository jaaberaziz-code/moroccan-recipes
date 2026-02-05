const fs = require('fs');

const apiRecipes = JSON.parse(fs.readFileSync('api_recipes.json', 'utf8'));

const imageMap = {
  'moroccan couscous': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80',
  'moroccan salad': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
  'b\'stilla': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80',
  'meshoui': 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80',
  'moroccan fish': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80'
};

const arabicTitles = {
  'Moroccan Couscous': 'كسكس مغربي',
  'Moroccan Salad': 'سلطة مغربية',
  "Individual B'stillas (Moroccan Chicken And Almond Pies) Pt 2": 'بسطيلة الدجاج باللوز',
  'Meshoui (Moroccan Lamb)': 'مشوي - لحم مغربي',
  'Moroccan Fish': 'سمك مغربي'
};

const arabicDescriptions = {
  'Moroccan Couscous': 'كسكس مغربي تقليدي بالتمر والزبيب واللوز.',
  'Moroccan Salad': 'سلطة مغربية منعشة بالبرغل والخضروات.',
  "Individual B'stillas (Moroccan Chicken And Almond Pies) Pt 2": 'فطائر دجاج مغربية باللوز والعسل.',
  'Meshoui (Moroccan Lamb)': 'لحم مشوي مغربي بالتوابل التقليدية.',
  'Moroccan Fish': 'سمك مغربي بالكمون والكزبرة.'
};

function convertRecipe(apiRecipe, index) {
  const title = apiRecipe.title;
  const id = title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 30);
  
  // Parse ingredients
  const ingredients = apiRecipe.ingredients
    .split('|')
    .map(i => i.trim())
    .filter(i => i && !i.toLowerCase().includes('see part'));
  
  // Parse instructions
  const instructions = apiRecipe.instructions
    .split(/\d+\.|\n/)
    .map(i => i.trim())
    .filter(i => i.length > 10);
  
  // Determine category
  let category = 'Main Course';
  if (title.toLowerCase().includes('salad')) category = 'Salad';
  if (title.toLowerCase().includes('soup')) category = 'Soup';
  if (title.toLowerCase().includes('dessert') || title.toLowerCase().includes('cookie')) category = 'Dessert';
  
  // Estimate times
  let prepTime = '20 minutes';
  let cookTime = '30 minutes';
  let difficulty = 'Medium';
  
  if (title.toLowerCase().includes('b\'stilla') || title.toLowerCase().includes('bastilla')) {
    prepTime = '45 minutes';
    cookTime = '1 hour';
    difficulty = 'Hard';
  } else if (title.toLowerCase().includes('meshoui')) {
    prepTime = '30 minutes';
    cookTime = '2 hours';
    difficulty = 'Medium';
  }
  
  // Parse servings
  let servings = 4;
  const servingsMatch = apiRecipe.servings.match(/(\d+)/);
  if (servingsMatch) servings = parseInt(servingsMatch[1]);
  
  // Find image
  let image = imageMap[Object.keys(imageMap).find(k => title.toLowerCase().includes(k))];
  if (!image) image = 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&q=80';
  
  return {
    id,
    title,
    titleAr: arabicTitles[title] || title,
    description: instructions[0] || `Delicious ${title}`,
    descriptionAr: arabicDescriptions[title] || `وصفة ${title}`,
    category,
    categoryAr: category === 'Main Course' ? 'طبق رئيسي' : category === 'Salad' ? 'سلطة' : category === 'Dessert' ? 'حلوى' : 'طبق رئيسي',
    prepTime,
    cookTime,
    servings,
    difficulty,
    image,
    ingredients,
    instructions
  };
}

// Read existing recipes
const existing = JSON.parse(fs.readFileSync('data/recipes.json', 'utf8'));

// Convert and filter out duplicates
const converted = [];
const seenTitles = new Set(existing.map(r => r.title.toLowerCase()));

for (const apiRecipe of apiRecipes) {
  if (!seenTitles.has(apiRecipe.title.toLowerCase())) {
    converted.push(convertRecipe(apiRecipe));
    seenTitles.add(apiRecipe.title.toLowerCase());
  }
}

// Merge
const allRecipes = [...existing, ...converted];

fs.writeFileSync('data/recipes.json', JSON.stringify(allRecipes, null, 2));
console.log(`Added ${converted.length} new recipes!`);
console.log('Total recipes:', allRecipes.length);
console.log('\nNew recipes:');
converted.forEach(r => console.log(`- ${r.title} (${r.titleAr})`));
