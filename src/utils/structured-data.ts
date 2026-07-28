/**
 * Generate JSON-LD structured data for Recipe pages.
 * Conforms to https://schema.org/Recipe
 */

interface RecipeData {
  title: string;
  description: string;
  date: Date;
  heroUrl: string;
  serves: string;
  prepTime: string;
  cookTime: string;
  cuisine: string;
  ingredients: { group?: string; items: string[] }[];
  method: string[];
  url: string;
}

/**
 * Convert a human-readable time string like "45 minutes" or "1 hour 30 minutes"
 * to ISO 8601 duration format (PT45M, PT1H30M).
 */
function toIsoDuration(timeStr: string): string {
  const lower = timeStr.toLowerCase().trim();
  let hours = 0;
  let minutes = 0;

  const hourMatch = lower.match(/(\d+)\s*(?:hour|hr)/);
  const minMatch = lower.match(/(\d+)\s*(?:minute|min)/);

  if (hourMatch) hours = parseInt(hourMatch[1], 10);
  if (minMatch) minutes = parseInt(minMatch[1], 10);

  // If only a plain number, assume minutes
  if (!hourMatch && !minMatch) {
    const plain = lower.match(/(\d+)/);
    if (plain) minutes = parseInt(plain[1], 10);
  }

  let iso = 'PT';
  if (hours > 0) iso += `${hours}H`;
  if (minutes > 0) iso += `${minutes}M`;
  return iso === 'PT' ? 'PT0M' : iso;
}

export function getRecipeJsonLd(recipe: RecipeData) {
  // Flatten all ingredient groups into a single array
  const allIngredients = recipe.ingredients.flatMap((g) => g.items);

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    description: recipe.description,
    image: recipe.heroUrl,
    author: {
      '@type': 'Person',
      name: 'Meera Singh',
    },
    datePublished: recipe.date.toISOString().split('T')[0],
    prepTime: toIsoDuration(recipe.prepTime),
    cookTime: toIsoDuration(recipe.cookTime),
    totalTime: toIsoDuration(
      `${parseTotalMinutes(recipe.prepTime) + parseTotalMinutes(recipe.cookTime)} minutes`
    ),
    recipeYield: recipe.serves,
    recipeCategory: 'Main course',
    recipeCuisine: recipe.cuisine,
    recipeIngredient: allIngredients,
    recipeInstructions: recipe.method.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      text: step,
    })),
    url: recipe.url,
  };
}

function parseTotalMinutes(timeStr: string): number {
  const lower = timeStr.toLowerCase();
  let total = 0;

  const hourMatch = lower.match(/(\d+)\s*(?:hour|hr)/);
  const minMatch = lower.match(/(\d+)\s*(?:minute|min)/);

  if (hourMatch) total += parseInt(hourMatch[1], 10) * 60;
  if (minMatch) total += parseInt(minMatch[1], 10);

  if (!hourMatch && !minMatch) {
    const plain = lower.match(/(\d+)/);
    if (plain) total = parseInt(plain[1], 10);
  }

  return total;
}
