'use client';

import { RecipeCard } from '@/components/RecipeCard';
import { Navigation } from '@/components/Navigation';
import { Logo } from '@/components/Logo';
import { getAllRecipes } from '@/lib/recipes';
import { ArrowRight, Sparkles, Utensils, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const recipes = getAllRecipes();
  const featuredRecipe = recipes[0];
  const otherRecipes = recipes.slice(1, 7);

  const stats = [
    { icon: Utensils, value: recipes.length, label: 'Recipes', labelAr: 'وصفة' },
    { icon: Clock, value: '15-60', label: 'Minutes', labelAr: 'دقيقة' },
    { icon: Sparkles, value: '100%', label: 'Authentic', labelAr: 'أصيلة' },
  ];

  return (
    <main className="min-h-screen bg-sand-light">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E07A5F' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>Version 2.0 is here!</span>
              </div>

              <div className="flex justify-center lg:justify-start mb-6">
                <Logo size="lg" />
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-charcoal leading-tight mb-6">
                Taste the Magic of
                <span className="block bg-gradient-to-r from-terracotta via-saffron to-majorelle bg-clip-text text-transparent">
                  Morocco
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-charcoal/70 mb-8 max-w-xl mx-auto lg:mx-0" dir="rtl">
                اكتشف أسرار المطبخ المغربي الأصيل مع وصفات شيماء
              </p>

              <p className="text-charcoal/60 mb-8 max-w-lg mx-auto lg:mx-0">
                Discover {recipes.length}+ authentic Moroccan recipes with beautiful photos. 
                From traditional Tagine to sweet Pastilla.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/recipes"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta/90 transition-all shadow-lg shadow-terracotta/25 hover:shadow-xl hover:shadow-terracotta/30 hover:-translate-y-0.5"
                >
                  Explore Recipes
                  <ArrowRight size={20} />
                </Link>

                <a
                  href="#featured"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-charcoal rounded-full font-medium border-2 border-charcoal/10 hover:border-majorelle hover:text-majorelle transition-all"
                >
                  Today's Pick
                </a>
              </div>
            </div>

            {/* Right Content - Featured Image */}
            <div className="relative hidden lg:block animate-fade-in-up">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-terracotta/20 via-saffron/20 to-majorelle/20 rounded-3xl blur-2xl" />
                <img
                  src={featuredRecipe.image}
                  alt={featuredRecipe.title}
                  className="relative rounded-3xl shadow-2xl aspect-[4/5] object-cover"
                />

                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl">
                  <p className="text-xs text-charcoal/50 uppercase tracking-wide mb-1">Featured Recipe</p>
                  <p className="font-editorial text-lg font-semibold text-charcoal max-w-[200px]">
                    {featuredRecipe.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-charcoal/60">
                    <Clock size={14} />
                    <span>{featuredRecipe.cookTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 md:mt-24 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white shadow-lg mb-4">
                  <stat.icon className="text-terracotta" size={24} />
                </div>
                <p className="font-editorial text-2xl md:text-3xl font-bold text-charcoal">
                  {stat.value}
                </p>
                <p className="text-sm text-charcoal/60">{stat.label}</p>
                <p className="text-xs text-charcoal/40" dir="rtl">{stat.labelAr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipe Section */}
      <section id="featured" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4">
            Featured Recipe
          </p>
          <h2 className="font-editorial text-4xl md:text-5xl font-bold text-charcoal">
            This Week's Highlight
          </h2>
          <p className="text-charcoal/60 mt-4 max-w-xl mx-auto" dir="rtl">
            وصفة مميزة من المطبخ المغربي
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <RecipeCard recipe={featuredRecipe} index={0} featured={true} />
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4">
              The Collection
            </p>
            <h2 className="font-editorial text-3xl md:text-4xl font-bold text-charcoal">
              More Authentic Recipes
            </h2>
            <p className="text-charcoal/60 mt-4 max-w-2xl mx-auto">
              Explore our curated selection of traditional Moroccan dishes with beautiful photos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherRecipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 px-8 py-4 bg-charcoal text-white rounded-full font-medium hover:bg-charcoal/90 transition-all"
            >
              View All Recipes
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <Logo size="md" />
              <p className="mt-4 text-white/60 max-w-xs">
                Authentic Moroccan recipes with a modern twist. Discover the flavors of Morocco.
              </p>
            </div>

            <div className="text-center">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <nav className="space-y-2">
                <Link href="/" className="block text-white/60 hover:text-white transition-colors">Home</Link>
                <Link href="/recipes" className="block text-white/60 hover:text-white transition-colors">Recipes</Link>
                <Link href="/about" className="block text-white/60 hover:text-white transition-colors">About</Link>
              </nav>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-semibold mb-4" dir="rtl">وصفات شيماء</h4>
              <p className="text-white/60" dir="rtl">
                اكتشف أسرار المطبخ المغربي
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
            <p>© 2026 Chaimae's Moroccan Recipes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
