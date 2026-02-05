'use client';

import { useState, useMemo } from 'react';
import { RecipeCard } from '@/components/RecipeCard';
import { Navigation } from '@/components/Navigation';
import { getAllRecipes } from '@/lib/recipes';

const categories = [
  { id: 'all', label: 'الكل' },
  { id: 'Main Course', label: 'طبق رئيسي' },
  { id: 'Soup', label: 'شوربة' },
  { id: 'Salad', label: 'سلطة' },
  { id: 'Dessert', label: 'حلوى' },
  { id: 'Breakfast', label: 'فطور' },
  { id: 'Beverage', label: 'مشروب' },
];

export default function RecipesPage() {
  const [recipes] = useState(() => getAllRecipes());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      const matchesSearch = 
        recipe.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing: string) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [recipes, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-sand-light dark:bg-charcoal pt-20 transition-colors">
      <Navigation />
      
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4"
          >جميع الوصفات</p>
          <h1 className="font-arabic text-4xl md:text-6xl font-bold text-charcoal dark:text-sand mb-4"
          >
            مجموعة الوصفات الكاملة
          </h1>
          <p className="font-arabic text-xl md:text-2xl text-charcoal/60 dark:text-sand/60"
          >
            {recipes.length}+ وصفة مغربية أصيلة
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <svg
              className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40 dark:text-sand/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            
            <input
              type="text"
              placeholder="ابحث عن وصفة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-14 bg-white dark:bg-charcoal-light border-2 border-morocco-sand dark:border-charcoal rounded-full text-charcoal dark:text-sand placeholder:text-charcoal/40 dark:placeholder:text-sand/40 focus:outline-none focus:border-terracotta transition-colors text-right"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 font-bold ${
                selectedCategory === cat.id
                  ? 'bg-terracotta text-white border-terracotta'
                  : 'bg-white dark:bg-charcoal-light text-charcoal dark:text-sand border-morocco-sand dark:border-charcoal hover:border-terracotta'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-center text-charcoal/60 dark:text-sand/60 mb-8"
        >
          تم العثور على {filteredRecipes.length} وصفة
        </p>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-charcoal/60 dark:text-sand/60 font-arabic mb-2"
            >لم يتم العثور على وصفات</p>
            <p className="text-charcoal/40 dark:text-sand/40"
            >جرب البحث بكلمات أخرى</p>
          </div>
        )}
      </section>

      <footer className="bg-charcoal dark:bg-black text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 وصفات شيماء. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </main>
  );
}
