const https = require('https');
const fs = require('fs');

const API_KEY = 'HGLhD102ZRjtUhwgINTi24FGU2vOcQzyNIGpW3m4';

// Try different query types
const queries = [
  'tagine',
  'couscous',
  'harira',
  'pastilla',
  'briouat',
  'msemmen',
  'harcha',
  'baghrir',
  'chebakia',
  'sellou',
  'kaab el ghzal',
  'zaalouk',
  'taktouka',
  'babbaganoush',
  'chicken stew',
  'lamb stew',
  'beef stew',
  'vegetable stew',
  'chickpea',
  'lentil soup',
  'meat pie',
  'phyllo',
  'mint tea',
  'ginger tea',
  'spiced rice',
  'pilaf',
  'apricot',
  'prune',
  'date',
  'fig',
  'almond',
  'pistachio',
  'honey cake',
  'semolina',
  'bulgur',
  'falafel',
  'shakshuka',
  'hummus',
  'tabbouleh',
  'kibbeh',
  'dolma'
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
      const recipes = await fetchRecipe(query);
      if (recipes && recipes.length > 0) {
        allRecipes.push(...recipes);
      }
      await new Promise(r => setTimeout(r, 200));
    } catch (err) {
      console.log(`Error with ${query}: ${err.message}`);
    }
  }
  
  // Remove duplicates
  const unique = [];
  const seen = new Set();
  for (const r of allRecipes) {
    if (r.title && !seen.has(r.title.toLowerCase())) {
      seen.add(r.title.toLowerCase());
      unique.push(r);
    }
  }
  
  console.log(`Total unique recipes: ${unique.length}`);
  fs.writeFileSync('api_recipes_more.json', JSON.stringify(unique, null, 2));
  
  console.log('\nRecipes:');
  unique.forEach((r, i) => console.log(`${i + 1}. ${r.title}`));
}

main();
