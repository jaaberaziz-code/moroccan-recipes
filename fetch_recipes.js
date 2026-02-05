const https = require('https');
const fs = require('fs');

const API_KEY = 'HGLhD102ZRjtUhwgINTi24FGU2vOcQzyNIGpW3m4';

const queries = [
  'moroccan tagine',
  'moroccan couscous',
  'moroccan soup',
  'moroccan salad',
  'moroccan dessert',
  'moroccan bread',
  'moroccan chicken',
  'moroccan lamb',
  'moroccan fish',
  'moroccan vegetarian'
];

async function fetchRecipe(query) {
  return new Promise((resolve, reject) => {
    const url = `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(query)}`;
    const options = {
      headers: {
        'X-Api-Key': API_KEY
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const recipes = JSON.parse(data);
          resolve(recipes);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  const allRecipes = [];
  
  for (const query of queries) {
    try {
      console.log(`Fetching: ${query}...`);
      const recipes = await fetchRecipe(query);
      if (recipes && recipes.length > 0) {
        allRecipes.push(...recipes);
        console.log(`  Found ${recipes.length} recipes`);
      }
      await new Promise(r => setTimeout(r, 500)); // Rate limiting
    } catch (err) {
      console.log(`  Error: ${err.message}`);
    }
  }
  
  // Remove duplicates
  const unique = [];
  const seen = new Set();
  for (const r of allRecipes) {
    if (!seen.has(r.title)) {
      seen.add(r.title);
      unique.push(r);
    }
  }
  
  console.log(`\nTotal unique recipes: ${unique.length}`);
  fs.writeFileSync('api_recipes.json', JSON.stringify(unique, null, 2));
  console.log('Saved to api_recipes.json');
}

main();
