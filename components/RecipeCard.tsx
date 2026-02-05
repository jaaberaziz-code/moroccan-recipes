'use client';

import { Recipe } from '@/lib/recipes';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
  featured?: boolean;
}

export function RecipeCard({ recipe, index, featured = false }: RecipeCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  if (featured) {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="group relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-500"
      >
        <Link href={`/recipe/${recipe.id}`}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 gradient-overlay opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            
            <div className="absolute top-4 left-4">
              <span className="bg-terracotta text-white px-3 py-1 text-xs font-medium tracking-wider uppercase">
                {recipe.category}
              </span>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="font-editorial text-2xl md:text-3xl font-semibold mb-2">
                {recipe.title}
              </h3>
              <p className="text-white/80 text-sm mb-4 line-clamp-2">{recipe.description}</p>
              
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {recipe.cookTime}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} /> {recipe.servings} people
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="recipe-card group bg-white overflow-hidden"
    >
      <Link href={`/recipe/${recipe.id}`}>
        <div className="relative aspect-[4/5] overflow-hidden"
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
          
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-sm text-charcoal px-3 py-1 text-xs font-medium tracking-wider uppercase">
              {recipe.category}
            </span>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="font-editorial text-xl md:text-2xl font-semibold mb-1 leading-tight">
              {recipe.title}
            </h3>
            
            <p className="font-editorial text-sm italic text-white/70 mb-3">{recipe.titleAr}</p>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {recipe.prepTime}
                </span>
                <span className="flex items-center gap-1">
                  <ChefHat size={12} /> {recipe.difficulty}
                </span>
              </div>
              
              <span className="flex items-center gap-1 text-saffron group-hover:translate-x-1 transition-transform">
                View <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}