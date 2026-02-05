'use client';

import { RecipeCard } from '@/components/RecipeCard';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';
import { getAllRecipes } from '@/lib/recipes';
import { ArrowLeft, Heart, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const recipes = getAllRecipes();
  const featuredRecipe = recipes[0];
  const otherRecipes = recipes.slice(1, 7);

  return (
    <main className="min-h-screen bg-sand-light dark:bg-charcoal transition-colors">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E07A5F' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <Logo size="lg" />
            </div>

            <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal dark:text-sand leading-tight mb-6"
            >
              اكتشف سحر
              <span className="block bg-gradient-to-r from-terracotta via-saffron to-majorelle bg-clip-text text-transparent"
              >
                المطبخ المغربي
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-charcoal/70 dark:text-sand/70 mb-6"
            >
              {recipes.length}+ وصفة مغربية أصيلة مع صور رائعة
            </p>

            <p className="text-charcoal/60 dark:text-sand/60 mb-10 max-w-lg mx-auto"
            >
              من الطاجين التقليدي إلى البسطيلة الحلوة، اكتشف نكهات المغرب الغنية
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/recipes"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white rounded-full font-bold hover:bg-terracotta/90 transition-all shadow-lg shadow-terracotta/25"
              >
                استكشف الوصفات
                <ArrowLeft size={20} />
              </Link>

              <a
                href="#story"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-charcoal text-charcoal dark:text-sand rounded-full font-bold border-2 border-charcoal/10 dark:border-sand/10 hover:border-terracotta transition-all"
              >
                قصتنا
              </a>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-16 max-w-4xl mx-auto"
          >
            <Link href={`/recipe/${featuredRecipe.id}`} className="block group"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={featuredRecipe.image}
                  alt={featuredRecipe.title}
                  className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute bottom-0 right-0 left-0 p-6 md:p-8 text-right"
                >
                  <p className="text-white/70 text-sm uppercase tracking-wider mb-2"
                  >وصفة مميزة</p>
                  <h3 className="font-arabic text-2xl md:text-3xl font-bold text-white mb-2"
                  >
                    {featuredRecipe.titleAr}
                  </h3>
                  <div className="flex items-center justify-end gap-4 text-white/80 text-sm"
                  >
                    <span>{featuredRecipe.servings} أشخاص</span>
                    <span>•</span>
                    <span>{featuredRecipe.cookTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 md:py-32 bg-white dark:bg-charcoal-light"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            <div className="order-2 lg:order-1"
            >
              <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4 text-right"
              >قصتنا</p>
              
              <h2 className="font-arabic text-4xl md:text-5xl font-bold text-charcoal dark:text-sand mb-6 text-right"
              >
                من المغرب بحب
              </h2>

              <p className="text-charcoal/70 dark:text-sand/70 text-lg mb-6 leading-relaxed text-right"
              >
                وصفات شيماء تجلب لك النكهات الأصيلة من قلب المغرب. مجموعتنا تضم وصفات تقليدية 
                متوارثة عبر الأجيال، من الطواجن العطرية إلى المعجنات اللذيذة.
              </p>

              <p className="text-charcoal/70 dark:text-sand/70 mb-8 leading-relaxed text-right"
              >
                المطبخ المغربي هو نسيج جميل من التأثيرات الأمازيغية والعربية والمتوسطية والإفريقية.
              </p>

              <div className="grid grid-cols-3 gap-6"
              >
                <div className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-sand dark:bg-charcoal rounded-2xl flex items-center justify-center"
                  >
                    <Heart className="text-terracotta" size={24} />
                  </div>
                  <p className="text-sm text-charcoal/60 dark:text-sand/60"
                  >صنع بحب</p>
                </div>

                <div className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-sand dark:bg-charcoal rounded-2xl flex items-center justify-center"
                  >
                    <BookOpen className="text-majorelle" size={24} />
                  </div>
                  <p className="text-sm text-charcoal/60 dark:text-sand/60"
                  >{recipes.length}+ وصفة</p>
                </div>

                <div className="text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 bg-sand dark:bg-charcoal rounded-2xl flex items-center justify-center"
                  >
                    <Award className="text-saffron" size={24} />
                  </div>
                  <p className="text-sm text-charcoal/60 dark:text-sand/60"
                  >أصيلة</p>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&q=80"
                  alt="توابل مغربية"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-terracotta rounded-2xl flex items-center justify-center shadow-xl"
              >
                <span className="text-white font-arabic text-4xl font-bold"
                >{recipes.length}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-20 bg-sand-light dark:bg-charcoal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16"
          >
            <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4"
            >المجموعة</p>
            <h2 className="font-arabic text-3xl md:text-4xl font-bold text-charcoal dark:text-sand"
            >
              وصفات مغربية أصيلة
            </h2>
            <p className="text-charcoal/60 dark:text-sand/60 mt-4 max-w-2xl mx-auto"
            >
              استكشف مجموعتنا المختارة من الأطباق المغربية التقليدية مع صور رائعة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {otherRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>

          <div className="text-center mt-12"
          >
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal dark:bg-sand text-white dark:text-charcoal rounded-full font-bold hover:bg-charcoal/90 dark:hover:bg-sand/90 transition-all"
            >
              <ArrowLeft size={20} />
              عرض كل الوصفات
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal dark:bg-black text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid md:grid-cols-3 gap-12 mb-12"
          >
            <div className="text-center md:text-right"
            >
              <Logo size="md" />
              <p className="mt-4 text-white/60 max-w-xs"
              >
                وصفات مغربية أصيلة بلمسة عصرية. اكتشف نكهات المغرب.
              </p>
            </div>

            <div className="text-center"
            >
              <h4 className="font-semibold mb-4"
              >روابط سريعة</h4>
              <nav className="space-y-2"
              >
                <Link href="/" className="block text-white/60 hover:text-white transition-colors"
                >الرئيسية</Link>
                <Link href="/recipes" className="block text-white/60 hover:text-white transition-colors"
                >الوصفات</Link>
                <Link href="/about" className="block text-white/60 hover:text-white transition-colors"
                >من نحن</Link>
              </nav>
            </div>

            <div className="text-center md:text-left"
            >
              <h4 className="font-semibold mb-4"
              >Chaimae's Recipes</h4>
              <p className="text-white/60"
              >
                Discover authentic Moroccan flavors
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm"
          >
            <p>© 2026 وصفات شيماء. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
