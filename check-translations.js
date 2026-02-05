const fs = require('fs');

// Read the Arabic translations file
let arabicJsonText = fs.readFileSync('/home/ubuntu/.openclaw/media/inbound/file_12---0d938f7a-d83f-46e2-8708-5e4fc3b74a4b.json', 'utf8');
arabicJsonText = arabicJsonText.replace(/: NaN/g, ': null');
const arabicData = JSON.parse(arabicJsonText);

// Read current recipes
const recipes = JSON.parse(fs.readFileSync('/home/ubuntu/.openclaw/workspace/moroccan-recipes/data/recipes.json', 'utf8'));

console.log('=== تحليل الترجمات ===\n');

// Check which recipes in the JSON have Arabic content
let arabicCount = 0;
let frenchCount = 0;

for (const item of arabicData) {
    const hasArabic = /[\u0600-\u06FF]/.test(item.name);
    if (hasArabic) {
        arabicCount++;
        console.log(`✅ ${item.name}`);
    } else {
        frenchCount++;
    }
}

console.log(`\n=== النتيجة ===`);
console.log(`وصفات بالعربية: ${arabicCount}`);
console.log(`وصفات بالفرنسية: ${frenchCount}`);
console.log(`الإجمالي: ${arabicData.length}`);

// Check current status
const currentArabic = recipes.filter(r => r.titleAr && /[\u0600-\u06FF]/.test(r.titleAr)).length;
console.log(`\n=== حالة قاعدة البيانات الحالية ===`);
console.log(`وصفات مترجمة حالياً: ${currentArabic}/${recipes.length}`);

// Show some examples of what's NOT translated
console.log(`\n=== أمثلة على الوصفات اللي ما عندهمش ترجمة (أول 10) ===`);
let notTranslatedCount = 0;
for (const item of arabicData) {
    if (!/[\u0600-\u06FF]/.test(item.name) && notTranslatedCount < 10) {
        console.log(`❌ ${item.name}`);
        notTranslatedCount++;
    }
}
