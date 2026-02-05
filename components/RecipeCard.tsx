'use client';

import { Recipe } from '@/lib/recipes';
import { Clock, Users, ChefHat, ArrowRight, Flame } from 'lucide-react';
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
        className="group block relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-terracotta text-white text-xs font-semibold rounded-full">
              <Flame size={14} />
              {recipe.category}
            </span>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h3 className="font-editorial text-2xl md:text-4xl font-bold text-white mb-2">
              {recipe.title}
            </h3>
            <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2 max-w-2xl">
              {recipe.description}
            </p>
            
            <div className="flex items-center gap-6 text-white/90 text-sm">
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {recipe.cookTime}
              </span>
              <span className="flex items-center gap-2">
                <Users size={16} />
                {recipe.servings} people
              </span>
              <span className="flex items-center gap-1 text-saffron group-hover:translate-x-1 transition-transform">
                View Recipe
                <ArrowRight size={16} />
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
      className="group block relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-charcoal text-xs font-semibold rounded-full">
            {recipe.category}
          </span>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-editorial text-lg md:text-xl font-bold text-white mb-1 line-clamp-1">
            {recipe.title}
          </h3>
          
          <p className="text-white/70 text-xs mb-3 line-clamp-1">{recipe.titleAr}</p>
          
          <div className="flex items-center justify-between text-white/80 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {recipe.prepTime.replace(' minutes', 'm')}
              </span>
              <span className="flex items-center gap-1">
                <ChefHat size={12} />
                {recipe.difficulty}
              </span>
            </div>
            
            <ArrowRight size={16} className="text-saffron group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
