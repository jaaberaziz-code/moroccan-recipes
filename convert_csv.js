const fs = require('fs');
const csv = fs.readFileSync('/home/ubuntu/.openclaw/media/inbound/file_8---e48eb386-564d-41cc-8193-cc9c2611cdda.csv', 'utf8');
const lines = csv.split('\n').slice(1);

function toKebabCase(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 50);
}

function determineCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('soupe') || n.includes('chorba') || n.includes('harira')) return { cat: 'Soup', ar: 'شوربة' };
  if (n.includes('salade')) return { cat: 'Salad', ar: 'سلطة' };
  if (n.includes('dessert') || n.includes('gâteau') || n.includes('cookie') || n.includes('cornes') || n.includes('makrout') || n.includes('chebakia') || n.includes('briwat') || n.includes('basboussa') || n.includes('sellou') || n.includes('msemen') || n.includes('harcha') || n.includes('baghrir')) return { cat: 'Dessert', ar: 'حلوى' };
  if (n.includes('crêpe') || n.includes('petit déjeuner') || n.includes('brioche')) return { cat: 'Breakfast', ar: 'فطور' };
  return { cat: 'Main Course', ar: 'طبق رئيسي' };
}

const recipes = [];

for (const line of lines) {
  if (!line.trim()) continue;
  
  const parts = line.split(',');
  if (parts.length < 8) continue;
  
  const id = parts[0];
  const name = parts[1];
  const ingredients = parts[2];
  const instructions = parts[3];
  const prepTime = parts[4];
  const cookTime = parts[5];
  const imageUrl = parts[7];
  
  if (!name || !ingredients) continue;
  
  const category = determineCategory(name);
  
  const ingredientList = ingredients.split(' - ').map(i => i.trim()).filter(i => i);
  
  const instructionList = instructions
    .split(/\n-\s*|\n/)
    .map(i => i.trim())
    .filter(i => i && i.length > 10);
  
  const recipe = {
    id: toKebabCase(name),
    title: name,
    titleAr: name,
    description: instructionList[0]?.substring(0, 150) + '...' || `Recette de ${name}`,
    descriptionAr: `وصفة ${name}`,
    category: category.cat,
    categoryAr: category.ar,
    prepTime: prepTime + ' minutes',
    cookTime: cookTime + ' minutes',
    servings: 4,
    difficulty: 'Medium',
    image: imageUrl || 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&q=80',
    ingredients: ingredientList,
    instructions: instructionList.length > 0 ? instructionList : ['Préparer les ingrédients', 'Cuire selon les instructions']
  };
  
  recipes.push(recipe);
}

const unique = [];
const seen = new Set();
for (const r of recipes) {
  if (!seen.has(r.title)) {
    seen.add(r.title);
    unique.push(r);
  }
}

console.log(`Converted ${unique.length} recipes`);
fs.writeFileSync('data/recipes_cuisineaz.json', JSON.stringify(unique, null, 2));
