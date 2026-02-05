const https = require('https');
const fs = require('fs');

const API_KEY = 'HGLhD102ZRjtUhwgINTi24FGU2vOcQzyNIGpW3m4';

// Many different queries to get variety
const queries = [
  'moroccan tagine',
  'moroccan couscous',
  'moroccan soup harira',
  'moroccan bastilla',
  'moroccan tea',
  'moroccan lamb',
  'moroccan chicken',
  'moroccan fish',
  'moroccan salad',
  'moroccan bread khobz',
  'moroccan dessert',
  'moroccan cookies',
  'moroccan kefta',
  'moroccan rfissa',
  'moroccan msemmen',
  'moroccan briwat',
  'moroccan chebakia',
  'moroccan taktouka',
  'moroccan zaalouk',
  'moroccan baghrir',
  'moroccan harcha',
  'moroccan sellou',
  'moroccan kaab el ghzal',
  'moroccan makrout',
  'moroccan shakshuka',
  'moroccan seffa',
  'moroccan tanjia',
  'moroccan mechoui',
  'moroccan pastilla',
  'moroccan amlou',
  'moroccan msmen',
  'moroccan corn',
  'moroccan vegetable',
  'moroccan eggplant',
  'moroccan zucchini',
  'moroccan chickpea',
  'moroccan lentil',
  'moroccan almond',
  'moroccan honey',
  'moroccan preserved lemon',
  'moroccan saffron',
  'moroccan ras el hanout',
  'moroccan spice mix',
  'moroccan mint',
  'moroccan lamb tagine',
  'moroccan chicken tagine',
  'moroccan fish tagine',
  'moroccan beef',
  'moroccan prune',
  'moroccan apricot',
  'moroccan date'
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
        console.log(`  ✓ Found ${recipes.length} recipes`);
        allRecipes.push(...recipes);
      } else {
        console.log(`  ✗ No recipes`);
      }
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 300));
    } catch (err) {
      console.log(`  ✗ Error: ${err.message}`);
    }
  }
  
  // Remove duplicates by title
  const unique = [];
  const seen = new Set();
  for (const r of allRecipes) {
    if (r.title && !seen.has(r.title.toLowerCase())) {
      seen.add(r.title.toLowerCase());
      unique.push(r);
    }
  }
  
  console.log(`\n========================================`);
  console.log(`Total recipes fetched: ${allRecipes.length}`);
  console.log(`Unique recipes: ${unique.length}`);
  console.log(`========================================\n`);
  
  fs.writeFileSync('api_recipes_40.json', JSON.stringify(unique, null, 2));
  console.log('Saved to api_recipes_40.json');
  
  // Show all recipe titles
  console.log('\nAll unique recipes:');
  unique.forEach((r, i) => console.log(`${i + 1}. ${r.title}`));
}

main();
