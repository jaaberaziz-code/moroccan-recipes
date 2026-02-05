const fs = require('fs');

const existing = JSON.parse(fs.readFileSync('data/recipes.json', 'utf8'));
const newRecipes = JSON.parse(fs.readFileSync('data/recipes_cuisineaz.json', 'utf8'));

const seen = new Set(existing.map(r => r.title));
let added = 0;

for (const r of newRecipes) {
  if (!seen.has(r.title)) {
    seen.add(r.title);
    existing.push(r);
    added++;
  }
}

fs.writeFileSync('data/recipes.json', JSON.stringify(existing, null, 2));
console.log(`Added ${added} new recipes`);
console.log(`Total: ${existing.length} recipes`);
