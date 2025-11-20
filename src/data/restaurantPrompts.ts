export const restaurantPrompts = [
  // Classic cuisines
  'Italian pizzeria',
  'French bistro',
  'Mexican street food',
  'Thai restaurant',
  'American diner',
  'Indian curry house',
  'Japanese sushi bar',
  'Chinese takeout',
  'Greek taverna',
  'Spanish tapas bar',

  // Regional specialties
  'Texas BBQ joint',
  'New York deli',
  'Southern soul food',
  'California fusion',
  'Louisiana Cajun',
  'Hawaiian poke bowl',
  'Vietnamese pho shop',
  'Korean BBQ',
  'Brazilian steakhouse',
  'Argentinian parrilla',

  // Casual dining
  'Burger shack',
  'Pizza parlor',
  'Taco truck',
  'Hot dog stand',
  'Sandwich shop',
  'Salad bar',
  'Soup kitchen',
  'Wing joint',
  'Breakfast cafe',
  'Brunch spot',

  // International flavors
  'Ethiopian restaurant',
  'Moroccan tagine',
  'Turkish kebab house',
  'Lebanese mezze',
  'Polish pierogi place',
  'German beer garden',
  'Irish pub food',
  'British fish and chips',
  'Australian meat pies',
  'Caribbean jerk chicken',

  // Specialty & themed
  'Vegan cafe',
  'Raw food bar',
  'Farm-to-table',
  'Organic bistro',
  'Gluten-free bakery',
  'Seafood shack',
  'Steakhouse',
  'Ramen shop',
  'Dumpling house',
  'Noodle bar',

  // Sweet treats
  'Ice cream parlor',
  'Donut shop',
  'Cupcake bakery',
  'Cookie cafe',
  'Chocolate shop',
  'Candy store',
  'Smoothie bar',
  'Juice bar',
  'Bubble tea shop',
  'Frozen yogurt',

  // Fun & whimsical
  'Pirate ship galley',
  'Space station cafeteria',
  'Wizard academy dining hall',
  'Dinosaur diner',
  'Superhero cafe',
  'Unicorn bakery',
  'Dragon BBQ',
  'Mermaid seafood',
  'Robot restaurant',
  'Time traveler bistro',

  // Kids favorites
  'Pizza party place',
  'Mac and cheese bar',
  'Chicken nugget palace',
  'Pancake house',
  'Waffle wonderland',
  'Grilled cheese garage',
  'Hot chocolate house',
  'Peanut butter cafe',
  'Rainbow food truck',
  'Monster burger joint',

  // More international
  'Filipino turo-turo',
  'Peruvian cevicheria',
  'Malaysian mamak',
  'Indonesian warung',
  'Singapore hawker',
  'Taiwanese night market',
  'Hong Kong dim sum',
  'Pakistani biryani house',
  'Nepalese momo spot',
  'Tibetan tea house',

  // Modern & trendy
  'Food truck fusion',
  'Pop-up supper club',
  'Ghost kitchen',
  'Cloud kitchen',
  'Gastro pub',
  'Wine and tapas',
  'Craft beer and bites',
  'Cocktail lounge bites',
  'Speakeasy snacks',
  'Rooftop bar menu',
];

/**
 * Get a random selection of restaurant prompts
 */
export function getRandomPrompts(count: number = 6): string[] {
  const shuffled = [...restaurantPrompts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
