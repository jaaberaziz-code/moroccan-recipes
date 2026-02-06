import { Navigation } from '@/components/Navigation';
import { getRecipeById, getAllRecipes } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import { Clock, Users, ChefHat, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface RecipePageProps {
  params: { id: string };
}

export function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

export default function RecipePage({ params }: RecipePageProps) {
  const recipe = getRecipeById(params.id);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-sand-light dark:bg-charcoal">
      <Navigation />

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <img
          src={recipe.image}
          alt={recipe.titleAr}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 right-0 left-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto text-right">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={18} />
              العودة للوصفات
            </Link>
            
            <span className="inline-block bg-terracotta text-white px-3 py-1 text-sm font-bold rounded-full mb-4"
            >
              {recipe.categoryAr}
            </span>
            
            <h1 className="font-arabic text-4xl md:text-6xl font-bold text-white mb-2"
            >
              {recipe.titleAr}
            </h1>
            
            <p className="font-arabic text-2xl md:text-3xl text-white/80"
            >
              {recipe.title}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 mb-12 p-6 bg-white dark:bg-charcoal-light shadow-lg rounded-2xl animate-fade-in-up">
          <div className="flex items-center gap-2">
            <Clock className="text-terracotta" size={20} />
            <div className="text-right">
              <p className="text-xs text-charcoal/50 dark:text-sand/50 uppercase">وقت التحضير</p>
              <p className="font-bold">{recipe.prepTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="text-terracotta" size={20} />
            <div className="text-right">
              <p className="text-xs text-charcoal/50 dark:text-sand/50 uppercase">وقت الطهي</p>
              <p className="font-bold">{recipe.cookTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="text-terracotta" size={20} />
            <div className="text-right">
              <p className="text-xs text-charcoal/50 dark:text-sand/50 uppercase">التقديم</p>
              <p className="font-bold">{recipe.servings} أشخاص</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ChefHat className="text-terracotta" size={20} />
            <div className="text-right">
              <p className="text-xs text-charcoal/50 dark:text-sand/50 uppercase">الصعوبة</p>
              <p className="font-bold">{recipe.difficulty}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Ingredients */}
          <div className="md:col-span-1 animate-fade-in-up order-2 md:order-1">
            <div className="sticky top-24">
              <h2 className="font-arabic text-2xl font-bold text-charcoal dark:text-sand mb-6 text-right"
              >
                المكونات
              </h2>
              
              <ul className="space-y-3 text-right"
              >
                {((recipe.ingredientsAr && recipe.ingredientsAr.length > 0) ? recipe.ingredientsAr : recipe.ingredients).map((ingredient, index) => (
                  <li key={index} className="ingredient-item text-charcoal/80 dark:text-sand/80"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions */}
          <div className="md:col-span-2 animate-fade-in-up order-1 md:order-2">
            <h2 className="font-arabic text-2xl font-bold text-charcoal dark:text-sand mb-6 text-right"
            >
              طريقة التحضير
            </h2>
            
            <div className="space-y-8"
            >
              {((recipe.instructionsAr && recipe.instructionsAr.length > 0) ? recipe.instructionsAr : recipe.instructions).map((step, index) => (
                <div key={index} className="flex gap-4"
                >
                  <div className="flex-shrink-0 order-2"
                  >
                    <div className="step-number"
                    >{index + 1}</div>
                  </div>
                  <p className="text-charcoal/80 dark:text-sand/80 leading-relaxed pt-2 flex-1 text-right order-1"
                  >{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-terracotta/10 dark:bg-terracotta/20 border-r-4 border-terracotta rounded-l-2xl"
            >
              <h3 className="font-arabic text-lg font-bold text-terracotta mb-2 text-right"
              >
                نصيحة الشيف
              </h3>
              <p className="text-charcoal/70 dark:text-sand/70 italic text-right"
              >
                {recipe.descriptionAr}
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-charcoal dark:bg-black text-white/60 py-12"
      >
        <div className="max-w-7xl mx-auto px-4 text-center"
        >
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={18} />
            العودة لجميع الوصفات
          </Link>
          <p>© 2026 وصفات شيماء</p>
        </div>
      </footer>
    </main>
  );
}
