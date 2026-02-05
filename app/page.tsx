import { RecipeCard } from '@/components/RecipeCard';
import { Hero } from '@/components/Hero';
import { Navigation } from '@/components/Navigation';
import { getAllRecipes } from '@/lib/recipes';

export default async function Home() {
  const recipes = await getAllRecipes();
  const featuredRecipe = recipes[0];
  const otherRecipes = recipes.slice(1);

  return (
    <main className="min-h-screen bg-sand-light">
      <Navigation />
      
      <Hero />

      {/* Featured Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4">
            Featured Recipe
          </p>
          <h2 className="font-editorial text-4xl md:text-5xl font-semibold text-charcoal editorial-underline">
            This Week's Highlight
          </h2>
        </div>

        <div className="max-w-4xl mx-auto mb-24">
          <RecipeCard recipe={featuredRecipe} index={0} featured={true} />
        </div>

        {/* Recipe Grid */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4">
            The Collection
          </p>
          <h2 className="font-editorial text-3xl md:text-4xl font-semibold text-charcoal">
            More Authentic Recipes
          </h2>
          <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto">
            Explore our curated selection of traditional Moroccan dishes, 
            each with its own story and unique blend of spices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherRecipes.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-charcoal text-white">
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="font-editorial text-3xl md:text-4xl font-semibold mb-4">
            Join Our Culinary Journey
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Subscribe to receive new Moroccan recipes, cooking tips, and 
            stories from the heart of Morocco.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-terracotta"
            />
            <button
              type="submit"
              className="btn-primary"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-dark text-white/60 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-editorial text-2xl font-semibold text-white mb-2">
                Chaimae's Recipes
              </h3>
              <p className="text-sm" dir="rtl">وصفات شيماء</p>
            </div>
            
            <p className="text-sm">
              © 2026 Chaimae's Moroccan Recipes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
