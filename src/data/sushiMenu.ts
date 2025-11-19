import { Restaurant } from '../types/menu';

export const sushiRestaurant: Restaurant = {
  name: "Sakura Sushi House",
  description: "Authentic Japanese Cuisine",
  sections: [
    {
      category: "Specialty Rolls",
      items: [
        {
          id: "roll-1",
          name: "Dragon Roll",
          description: "Eel, cucumber, avocado topped with thinly sliced avocado and eel sauce",
          price: "$14.95",
          category: "Specialty Rolls"
        },
        {
          id: "roll-2",
          name: "Rainbow Roll",
          description: "California roll topped with assorted fresh fish and avocado",
          price: "$13.95",
          category: "Specialty Rolls"
        },
        {
          id: "roll-3",
          name: "Spicy Tuna Roll",
          description: "Fresh tuna mixed with spicy mayo, cucumber, and scallions",
          price: "$11.95",
          category: "Specialty Rolls"
        },
        {
          id: "roll-4",
          name: "Spider Roll",
          description: "Soft shell crab tempura, cucumber, avocado, and spicy mayo",
          price: "$12.95",
          category: "Specialty Rolls"
        },
        {
          id: "roll-5",
          name: "Philadelphia Roll",
          description: "Smoked salmon, cream cheese, and cucumber",
          price: "$10.95",
          category: "Specialty Rolls"
        }
      ]
    },
    {
      category: "Classic Rolls",
      items: [
        {
          id: "classic-1",
          name: "California Roll",
          description: "Crab, avocado, and cucumber with sesame seeds",
          price: "$8.95",
          category: "Classic Rolls"
        },
        {
          id: "classic-2",
          name: "Salmon Avocado Roll",
          description: "Fresh salmon and creamy avocado",
          price: "$9.95",
          category: "Classic Rolls"
        },
        {
          id: "classic-3",
          name: "Tuna Roll",
          description: "Fresh tuna wrapped in rice and nori",
          price: "$9.50",
          category: "Classic Rolls"
        },
        {
          id: "classic-4",
          name: "Cucumber Roll",
          description: "Fresh cucumber wrapped in rice and nori (vegetarian)",
          price: "$6.95",
          category: "Classic Rolls"
        }
      ]
    },
    {
      category: "Nigiri",
      items: [
        {
          id: "nigiri-1",
          name: "Salmon Nigiri",
          description: "Two pieces of fresh salmon over pressed rice",
          price: "$7.95",
          category: "Nigiri"
        },
        {
          id: "nigiri-2",
          name: "Tuna Nigiri",
          description: "Two pieces of premium tuna over pressed rice",
          price: "$8.95",
          category: "Nigiri"
        },
        {
          id: "nigiri-3",
          name: "Yellowtail Nigiri",
          description: "Two pieces of yellowtail over pressed rice",
          price: "$8.50",
          category: "Nigiri"
        },
        {
          id: "nigiri-4",
          name: "Eel Nigiri",
          description: "Two pieces of freshwater eel with eel sauce over pressed rice",
          price: "$8.95",
          category: "Nigiri"
        },
        {
          id: "nigiri-5",
          name: "Shrimp Nigiri",
          description: "Two pieces of cooked shrimp over pressed rice",
          price: "$6.95",
          category: "Nigiri"
        }
      ]
    },
    {
      category: "Appetizers",
      items: [
        {
          id: "app-1",
          name: "Miso Soup",
          description: "Traditional Japanese soup with tofu, seaweed, and scallions",
          price: "$3.95",
          category: "Appetizers"
        },
        {
          id: "app-2",
          name: "Edamame",
          description: "Steamed young soybeans lightly salted",
          price: "$5.95",
          category: "Appetizers"
        },
        {
          id: "app-3",
          name: "Gyoza",
          description: "Six pan-fried pork dumplings served with ponzu sauce",
          price: "$7.95",
          category: "Appetizers"
        },
        {
          id: "app-4",
          name: "Seaweed Salad",
          description: "Marinated seaweed with sesame seeds",
          price: "$6.95",
          category: "Appetizers"
        },
        {
          id: "app-5",
          name: "Agedashi Tofu",
          description: "Lightly fried tofu in savory dashi broth",
          price: "$6.50",
          category: "Appetizers"
        }
      ]
    },
    {
      category: "Beverages",
      items: [
        {
          id: "bev-1",
          name: "Ramune",
          description: "Japanese marble soda in original or strawberry flavor",
          price: "$3.95",
          category: "Beverages"
        },
        {
          id: "bev-2",
          name: "Green Tea (Hot)",
          description: "Traditional Japanese green tea",
          price: "$2.95",
          category: "Beverages"
        },
        {
          id: "bev-3",
          name: "Iced Green Tea",
          description: "Refreshing cold green tea",
          price: "$3.50",
          category: "Beverages"
        },
        {
          id: "bev-4",
          name: "Sake (Hot or Cold)",
          description: "Premium Japanese rice wine",
          price: "$8.95",
          category: "Beverages"
        },
        {
          id: "bev-5",
          name: "Calpico",
          description: "Sweet and tangy Japanese soft drink",
          price: "$3.95",
          category: "Beverages"
        }
      ]
    }
  ]
};
