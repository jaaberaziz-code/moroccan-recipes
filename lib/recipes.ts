import recipesData from '@/data/recipes.json';

export interface Recipe {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  category: string;
  categoryAr: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  source?: string;
}

const recipes: Recipe[] = recipesData as Recipe[];

export function getAllRecipes(): Recipe[] {
  return recipes;
}

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(recipe => recipe.id === id);
}
