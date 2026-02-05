import { RecipeCard } from '@/components/RecipeCard';
import { Navigation } from '@/components/Navigation';
import { getAllRecipes } from '@/lib/recipes';

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <main className="min-h-screen bg-sand-light pt-20">
      <Navigation />
      
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </div>
      </section>

      <footer className="bg-charcoal text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 Chaimae's Moroccan Recipes</p>
        </div>
      </footer>
    </main>
  );
}