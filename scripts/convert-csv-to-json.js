const fs = require('fs');

// Read the CSV file
const csvPath = '/home/ubuntu/.openclaw/media/inbound/file_8---e48eb386-564d-41cc-8193-cc9c2611cdda.csv';
const outputPath = '/home/ubuntu/.openclaw/workspace/moroccan-recipes/data/recipes_cuisineaz.json';
const existingRecipesPath = '/home/ubuntu/.openclaw/workspace/moroccan-recipes/data/recipes.json';

// Helper function to convert string to kebab-case
function toKebabCase(str) {
  if (!str) return 'recipe-' + Math.random().toString(36).substr(2, 9);
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Helper function to determine category from recipe name
function determineCategory(name) {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('soupe') || lowerName.includes('chorba') || lowerName.includes('harira') || lowerName.includes('bissara')) {
    return 'Soup';
  }
  if (lowerName.includes('salade') || lowerName.includes('zaalouk') || lowerName.includes('taktouka')) {
    return 'Salad';
  }
  if (lowerName.includes('sellou') || lowerName.includes('chebakia') || lowerName.includes('briwat') || 
      lowerName.includes('cornes') || lowerName.includes('ghriba') || lowerName.includes('sfouf') || 
      lowerName.includes('basboussa') || lowerName.includes('brick') || lowerName.includes('briouate') ||
      lowerName.includes('gazelle') || lowerName.includes('gâteau') || lowerName.includes('cookie') ||
      lowerName.includes('sablé') || lowerName.includes('tarte') || lowerName.includes('cake')) {
    return 'Dessert';
  }
  if (lowerName.includes('msemen') || lowerName.includes('baghrir') || lowerName.includes('harsha') || 
      lowerName.includes('khobz') || lowerName.includes('krachel') || lowerName.includes('meloui') ||
      lowerName.includes('crêpe') || lowerName.includes('beignet')) {
    return 'Breakfast';
  }
  return 'Main Course';
}

// Helper function to translate category to Arabic
function translateCategoryToArabic(category) {
  const translations = {
    'Soup': 'شوربة',
    'Salad': 'سلطة',
    'Dessert': 'حلوى',
    'Breakfast': 'إفطار',
    'Main Course': 'طبق رئيسي'
  };
  return translations[category] || 'طبق رئيسي';
}

// Helper function to split ingredients
function parseIngredients(ingredientsStr) {
  if (!ingredientsStr) return [];
  return ingredientsStr.split(' - ').map(i => i.trim()).filter(i => i.length > 0);
}

// Helper function to split instructions
function parseInstructions(instructionsStr) {
  if (!instructionsStr) return [];
  // Split by newline followed by dash, or just newline
  const steps = instructionsStr.split(/\n-?\s*/).map(s => s.trim()).filter(s => s.length > 0);
  return steps;
}

// Helper function to create description
function createDescription(instructions) {
  if (!instructions) return '';
  const cleaned = instructions.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  if (cleaned.length <= 150) return cleaned;
  return cleaned.substring(0, 150) + '...';
}

// Parse CSV handling multi-line quoted fields
function parseCSV(csvContent) {
  const recipes = [];
  const lines = csvContent.split('\n');
  
  let currentRow = '';
  let inQuotes = false;
  let rowCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Track if we're inside quotes
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '"' && (j === 0 || line[j-1] !== '\\')) {
        inQuotes = !inQuotes;
      }
    }
    
    currentRow += (currentRow ? '\n' : '') + line;
    
    // If we're not in quotes, we've completed a row
    if (!inQuotes && currentRow.trim()) {
      // Skip header
      if (rowCount === 0) {
        rowCount++;
        currentRow = '';
        continue;
      }
      
      // Parse the complete row
      const fields = parseCSVLine(currentRow);
      
      if (fields.length >= 9) {
        const [index, name, ingredients, instructions, prepTime, cookTime, totalTime, imageUrl, source] = fields;
        
        if (name && name.trim()) {
          const category = determineCategory(name);
          
          recipes.push({
            id: toKebabCase(name),
            title: name.trim(),
            titleAr: name.trim(),
            description: createDescription(instructions),
            descriptionAr: 'وصفة ' + name.trim(),
            category: category,
            categoryAr: translateCategoryToArabic(category),
            prepTime: (prepTime ? prepTime.trim() : '15') + ' minutes',
            cookTime: (cookTime ? cookTime.trim() : '30') + ' minutes',
            servings: 4,
            difficulty: 'Medium',
            image: imageUrl ? imageUrl.trim() : '',
            ingredients: parseIngredients(ingredients),
            instructions: parseInstructions(instructions),
            source: 'cuisineaz.com'
          });
        }
      }
      
      rowCount++;
      currentRow = '';
    }
  }
  
  return recipes;
}

// Parse a single CSV line
function parseCSVLine(line) {
  const fields = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;
  
  while (i < line.length) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        currentField += '"';
        i += 2;
      } else {
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField.trim());
      currentField = '';
      i++;
    } else {
      currentField += char;
      i++;
    }
  }
  fields.push(currentField.trim());
  return fields;
}

// Main execution
console.log('Reading CSV file...');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

console.log('Parsing CSV...');
const newRecipes = parseCSV(csvContent);
console.log(`Parsed ${newRecipes.length} recipes from CSV`);

if (newRecipes.length === 0) {
  console.log('ERROR: No recipes parsed! Check CSV format.');
  process.exit(1);
}

// Show first few recipes
console.log('\nFirst 3 recipes parsed:');
newRecipes.slice(0, 3).forEach((r, i) => {
  console.log(`${i + 1}. ${r.title} (${r.category})`);
});

// Write the new recipes file
console.log('\nWriting recipes_cuisineaz.json...');
fs.writeFileSync(outputPath, JSON.stringify(newRecipes, null, 2));

// Read existing recipes and merge
console.log('Reading existing recipes.json...');
let existingRecipes = [];
if (fs.existsSync(existingRecipesPath)) {
  try {
    existingRecipes = JSON.parse(fs.readFileSync(existingRecipesPath, 'utf-8'));
    console.log(`Found ${existingRecipes.length} existing recipes`);
  } catch (e) {
    console.log('Error reading existing recipes:', e.message);
  }
}

// Merge recipes avoiding duplicates by title
const existingTitles = new Set(existingRecipes.map(r => r.title.toLowerCase()));
const mergedRecipes = [...existingRecipes];
let addedCount = 0;
let duplicates = [];

for (const recipe of newRecipes) {
  if (!existingTitles.has(recipe.title.toLowerCase())) {
    mergedRecipes.push(recipe);
    existingTitles.add(recipe.title.toLowerCase());
    addedCount++;
  } else {
    duplicates.push(recipe.title);
  }
}

if (duplicates.length > 0) {
  console.log(`\nDuplicates skipped: ${duplicates.join(', ')}`);
}

// Write merged recipes
console.log('Writing merged recipes.json...');
fs.writeFileSync(existingRecipesPath, JSON.stringify(mergedRecipes, null, 2));

console.log(`\n=================================`);
console.log(`TOTAL RECIPES AFTER MERGE: ${mergedRecipes.length}`);
console.log(`=================================`);
console.log(`  - Original recipes: ${existingRecipes.length}`);
console.log(`  - New recipes added: ${addedCount}`);
console.log(`  - Duplicates skipped: ${duplicates.length}`);
