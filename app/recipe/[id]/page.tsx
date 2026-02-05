import { Navigation } from '@/components/Navigation';
import { getRecipeById, getAllRecipes } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import { Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface RecipePageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const recipes = await getAllRecipes();
  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipe = await getRecipeById(params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-sand-light">
      <Navigation />

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Recipes
            </Link>
            
            <span className="inline-block bg-terracotta text-white px-3 py-1 text-xs uppercase tracking-wider mb-4">
              {recipe.category}
            </span>
            
            <h1 className="font-editorial text-4xl md:text-6xl font-semibold text-white mb-2">
              {recipe.title}
            </h1>
            
            <p className="font-editorial text-2xl md:text-3xl text-white/80" dir="rtl">
              {recipe.titleAr}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 mb-12 p-6 bg-white shadow-lg animate-fade-in-up">
          <div className="flex items-center gap-2">
            <Clock className="text-terracotta" size={20} />
            <div>
              <p className="text-xs text-charcoal/50 uppercase">Prep Time</p>
              <p className="font-medium">{recipe.prepTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="text-terracotta" size={20} />
            <div>
              <p className="text-xs text-charcoal/50 uppercase">Cook Time</p>
              <p className="font-medium">{recipe.cookTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="text-terracotta" size={20} />
            <div>
              <p className="text-xs text-charcoal/50 uppercase">Servings</p>
              <p className="font-medium">{recipe.servings} people</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ChefHat className="text-terracotta" size={20} />
            <div>
              <p className="text-xs text-charcoal/50 uppercase">Difficulty</p>
              <p className="font-medium">{recipe.difficulty}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Ingredients */}
          <div className="md:col-span-1 animate-fade-in-up">
            <div className="sticky top-24">
              <h2 className="font-editorial text-2xl font-semibold text-charcoal mb-6 editorial-underline">
                Ingredients
              </h2>
              
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item text-charcoal/80">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2 animate-fade-in-up">
            <h2 className="font-editorial text-2xl font-semibold text-charcoal mb-6 editorial-underline">
              Instructions
            </h2>
            
            <div className="space-y-8">
              {recipe.instructions.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="step-number">{index + 1}</div>
                  </div>
                  <p className="text-charcoal/80 leading-relaxed pt-2">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-majorelle/10 border-l-4 border-majorelle">
              <h3 className="font-editorial text-lg font-semibold text-majorelle mb-2">
                Chef's Note
              </h3>
              <p className="text-charcoal/70 italic">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-charcoal text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to All Recipes
          </Link>
          <p>© 2026 Chaimae's Moroccan Recipes</p>
        </div>
      </footer>
    </main>
  );
}