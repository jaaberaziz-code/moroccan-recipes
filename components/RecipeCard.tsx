'use client';

import { Recipe } from '@/lib/recipes';
import { Clock, ChefHat, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
  index?: number;
  featured?: boolean;
}

export function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  if (featured) {
    return (
      <Link
        href={`/recipe/${recipe.id}`}
        className="group block relative overflow-hidden rounded-3xl bg-white dark:bg-charcoal-light shadow-xl hover:shadow-2xl transition-all duration-500"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.titleAr}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute top-4 right-4">
            <span className="px-4 py-2 bg-terracotta text-white text-sm font-bold rounded-full"
            >
              {recipe.categoryAr}
            </span>
          </div>
          
          <div className="absolute bottom-0 right-0 left-0 p-6 md:p-8 text-right">
            <h3 className="font-arabic text-2xl md:text-4xl font-bold text-white mb-2">
              {recipe.titleAr}
            </h3>
            <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2 max-w-2xl ml-auto text-right">
              {recipe.descriptionAr}
            </p>
            
            <div className="flex items-center justify-end gap-6 text-white/90 text-sm">
              <span className="flex items-center gap-2">
                {recipe.cookTime}
                <Clock size={16} />
              </span>
              <span className="flex items-center gap-1 text-saffron group-hover:-translate-x-1 transition-transform">
                عرض الوصفة
                <ArrowLeft size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="group block relative overflow-hidden rounded-2xl bg-white dark:bg-charcoal-light shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.titleAr}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1.5 bg-white/95 dark:bg-charcoal/95 backdrop-blur-sm text-charcoal dark:text-sand text-sm font-bold rounded-full"
          >
            {recipe.categoryAr}
          </span>
        </div>
        
        <div className="absolute bottom-0 right-0 left-0 p-4 text-right">
          <h3 className="font-arabic text-lg md:text-xl font-bold text-white mb-1 line-clamp-1"
          >
            {recipe.titleAr}
          </h3>
          
          <p className="text-white/70 text-sm mb-3 line-clamp-1">{recipe.title}</p>
          
          <div className="flex items-center justify-end gap-3 text-white/80 text-sm">
            <ArrowLeft size={16} className="text-saffron group-hover:-translate-x-1 transition-transform" />
            
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                {recipe.difficulty}
                <ChefHat size={12} />
              </span>
              <span className="flex items-center gap-1">
                {recipe.prepTime.replace(' minutes', 'د')}
                <Clock size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
