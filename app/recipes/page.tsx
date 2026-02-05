'use client';

import { useState, useMemo } from 'react';
import { RecipeCard } from '@/components/RecipeCard';
import { Navigation } from '@/components/Navigation';
import { getAllRecipes } from '@/lib/recipes';

const categories = [
  { id: 'all', label: 'All', labelAr: 'الكل' },
  { id: 'Main Course', label: 'Main Course', labelAr: 'طبق رئيسي' },
  { id: 'Soup', label: 'Soup', labelAr: 'شوربة' },
  { id: 'Salad', label: 'Salad', labelAr: 'سلطة' },
  { id: 'Dessert', label: 'Dessert', labelAr: 'حلوى' },
  { id: 'Breakfast', label: 'Breakfast', labelAr: 'فطور' },
  { id: 'Beverage', label: 'Beverage', labelAr: 'مشروب' },
];

export default function RecipesPage() {
  const [recipes] = useState(() => getAllRecipes());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      const matchesSearch = 
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing: string) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [recipes, selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-sand-light pt-20">
      <Navigation />
      
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4">
            All Recipes
          </p>
          <h1 className="font-editorial text-4xl md:text-6xl font-semibold text-charcoal mb-4">
            The Complete Collection
          </h1>
          <p className="font-editorial text-xl md:text-2xl text-charcoal/60" dir="rtl">
            مجموعة الوصفات الكاملة
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search recipes... | ابحث عن وصفة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-14 bg-white border-2 border-morocco-sand rounded-full text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-majorelle transition-colors"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40"
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
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-majorelle text-white border-majorelle'
                  : 'bg-white text-charcoal border-morocco-sand hover:border-majorelle'
              }`}
            >
              <span className="font-medium">{cat.label}</span>
              <span className="mx-2">|</span>
              <span dir="rtl">{cat.labelAr}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-center text-charcoal/60 mb-8">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
        </p>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-charcoal/60 font-editorial mb-2">No recipes found</p>
            <p className="text-charcoal/40" dir="rtl">لم يتم العثور على وصفات</p>
          </div>
        )}
      </section>

      <footer className="bg-charcoal text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 Chaimae's Moroccan Recipes</p>
        </div>
      </footer>
    </main>
  );
}
