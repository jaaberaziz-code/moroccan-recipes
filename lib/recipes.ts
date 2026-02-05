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
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const recipes = await import('@/data/recipes.json');
  return recipes.default;
}

export async function getRecipeById(id: string): Promise<Recipe | undefined> {
  const recipes = await getAllRecipes();
  return recipes.find(recipe => recipe.id === id);
}