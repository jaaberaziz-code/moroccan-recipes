const fs = require('fs');

const recipes = JSON.parse(fs.readFileSync('/home/ubuntu/.openclaw/workspace/moroccan-recipes/data/recipes.json', 'utf8'));

console.log('=== التحقق من الصور ===\n');

let workingImages = 0;
let defaultImages = 0;

for (const recipe of recipes) {
    const isDefaultImage = recipe.image.includes('default/default.jpg');
    if (isDefaultImage) {
        defaultImages++;
        console.log(`❌ صورة غير موجودة: ${recipe.title}`);
    } else {
        workingImages++;
    }
}

console.log(`\n=== النتيجة ===`);
console.log(`✅ صور شغالة: ${workingImages}`);
console.log(`❌ صور ناقصة (default): ${defaultImages}`);
console.log(`الإجمالي: ${recipes.length}`);

if (defaultImages > 0) {
    console.log(`\n⚠️ في ${defaultImages} وصفات ما عندهمش صور صحيحة`);
} else {
    console.log(`\n✅ جميع الصور شغالة!`);
}
