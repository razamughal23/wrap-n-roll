import pizzaImg from "@/assets/pizza.jpg";
import shawarmaImg from "@/assets/shawarma.jpg";
import burgerImg from "@/assets/burger.jpg";
import friesImg from "@/assets/fries.jpg";
import wrapImg from "@/assets/wrap.jpg";

export type Price = string; // "Rs. 400" or "S 450 / M 850 / L 1400 / XL 1800"

export interface MenuItem {
  name: string;
  price: Price;
  desc?: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  image?: string;
  items: MenuItem[];
}

export const MENU: MenuCategory[] = [
  {
    id: "pizzas",
    title: "Pizzas",
    image: pizzaImg,
    items: [
      { name: "Cheese Lover", price: "S 450 / M 850 / L 1400 / XL 1800", desc: "Mozzarella cheese and Wrap & Roll pizza sauce.", image: pizzaImg },
      { name: "Chicken Tikka", price: "S 450 / M 850 / L 1400 / XL 1800", desc: "Chicken tikka, onions, cheese & sauce.", image: pizzaImg },
      { name: "Chicken Fajita", price: "S 450 / M 850 / L 1400 / XL 1800", desc: "Chicken fajita, onions, green peppers, cheese & sauce.", image: pizzaImg },
      { name: "Hot & Spicy", price: "S 500 / M 900 / L 1500 / XL 1900", desc: "Mexican chicken, onion, green peppers, red chillies, cheese & sauce.", image: pizzaImg },
      { name: "Veggie Lover", price: "S 500 / M 900 / L 1500 / XL 1900", desc: "Onions, green pepper, mushrooms, black olives, jalapenos, sweet corn, cheese & pizza sauce.", image: pizzaImg },
      { name: "Mexican Madness", price: "S 500 / M 900 / L 1500 / XL 1900", desc: "Mexican chicken, onions, green peppers, jalapenos, cheese & pizza sauce.", image: pizzaImg },
      { name: "Chicken Supreme", price: "S 500 / M 900 / L 1500 / XL 1900", desc: "Chicken sausages, tikka, onions, peppers, mushrooms, olives, corn, cheese & pizza sauce.", image: pizzaImg },
      { name: "Malai Boti Pizza", price: "M 1100 / L 1700 / XL 2200", desc: "Malai boti chicken, green peppers, onions, cheese and special sauce.", image: pizzaImg },
      { name: "Cheese Stuffed", price: "M 1100 / L 1700 / XL 2200", desc: "Chicken tikka, fajita, green pepper, onions, chillies & sausages.", image: pizzaImg },
      { name: "Kebab Stuffed", price: "M 1100 / L 1700 / XL 2200", desc: "Chicken tikka, sausages, onions, tomato topped with mayonnaise.", image: pizzaImg },
      { name: "Crown Crust", price: "M 1100 / L 1700 / XL 2200", desc: "Chicken kebab, green pepper, onions, green chillies.", image: pizzaImg },
      { name: "Lazania Pizza", price: "M 1200 / L 1800 / XL 2300", desc: "Pizza sauce, double layer cheese, double chicken, capsicum, olive, jalapeno, special sauce.", image: pizzaImg },
    ],
  },
  {
    id: "deals",
    title: "Deals",
    items: [
      { name: "Deal 1", price: "Rs. 950", desc: "2 Small Pizzas + 1 Half Ltr Bottle" },
      { name: "Deal 2", price: "Rs. 450", desc: "1 Zinger Burger + Fries + 345ml Bottle" },
      { name: "Deal 3", price: "Rs. 2399", desc: "1 Large Pizza + 2 Zinger Burgers + 1 Regular Fries + 1.5 Ltr Bottle" },
      { name: "Deal 4", price: "Rs. 1450", desc: "2 Mexican Wraps + 1 Tortilla Wrap + 1.5 Ltr Bottle" },
      { name: "Deal 5", price: "Rs. 2700", desc: "1 XL Pizza + 1 BBQ Sandwich + 1 Small Loaded Fries + 5 Wings + 1.5 Ltr Bottle" },
    ],
  },
  {
    id: "shawarma",
    title: "Shawarma",
    image: shawarmaImg,
    items: [
      { name: "Simple Shawarma", price: "Rs. 250", image: shawarmaImg },
      { name: "Zinger Shawarma", price: "Rs. 330", image: shawarmaImg },
      { name: "Pocket Shawarma", price: "Rs. 350", image: shawarmaImg },
      { name: "Platter Shawarma", price: "S Rs. 500 / L Rs. 600", image: shawarmaImg },
      { name: "Jumbo Shawarma", price: "Rs. 400", image: shawarmaImg },
      { name: "Chicken Cheese", price: "Rs. 300", image: shawarmaImg },
      { name: "Jumbo Quesadila", price: "Rs. 650", image: shawarmaImg },
      { name: "Cheesy Quesadila", price: "Rs. 450", image: shawarmaImg },
      { name: "Pita Jumbo Special", price: "Rs. 450", image: shawarmaImg },
    ],
  },
  {
    id: "wraps",
    title: "Wraps",
    image: wrapImg,
    items: [
      { name: "Classic Cheese Wrap", price: "Rs. 500", desc: "Special bread, cheese, chicken, onions, green pepper & sauce.", image: wrapImg },
      { name: "Mexican Wrap", price: "Rs. 500", desc: "Special bread, mustard sauce, hot sauce, green chillies, jalapeno, cheese, chicken, black olives & sauce.", image: wrapImg },
      { name: "Wrap & Roll Special", price: "Rs. 600", desc: "Chicken sausages, tikka, onion, green pepper, mushroom, black olives, cheese, fries & sauce.", image: wrapImg },
      { name: "Crispy Wrap (Twister)", price: "Rs. 450", image: wrapImg },
      { name: "Tortilla Wrap", price: "Rs. 450", image: wrapImg },
      { name: "Cheese Tortilla Wrap", price: "Rs. 500", image: wrapImg },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    image: burgerImg,
    items: [
      { name: "Chicken Patty Burger", price: "Rs. 350", desc: "Chicken patty, lettuce and mayo.", image: burgerImg },
      { name: "Zinger Burger", price: "Rs. 400", desc: "Crunchy chicken fillet, lettuce and mayo.", image: burgerImg },
      { name: "Tender Crunch Burger", price: "Rs. 400", desc: "Crispy tender fillet, lettuce, jalapenos, cheese slice, chipotle sauce.", image: burgerImg },
      { name: "Cheese & Jalapeno", price: "Rs. 450", desc: "Double grill chicken patty, cheese, tomato, onion rings, lettuce, jalapeno.", image: burgerImg },
      { name: "Double Zinger Burger", price: "Rs. 650", desc: "Double crunchy chicken fillet, cheese slice, lettuce, mustard sauce and mayo.", image: burgerImg },
      { name: "Crazy Beef", price: "Rs. 600", desc: "Grill beef patty, cheese slice and jalapeno sauce.", image: burgerImg },
      { name: "Passionate Punch", price: "Rs. 500", desc: "Grill beef patty, cheese, tomato, onion rings, lettuce, jalapeno, thousand island sauce.", image: burgerImg },
      { name: "Grill Delight", price: "Rs. 650", desc: "Double grilled beef patty, cheese, onion ring, lettuce, jalapeno and BBQ sauce.", image: burgerImg },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    items: [
      { name: "Classic Sandwich", price: "Rs. 400" },
      { name: "Mexican Grilled", price: "Rs. 350" },
      { name: "BBQ Chicken", price: "Rs. 400" },
    ],
  },
  {
    id: "sides",
    title: "Side Orders",
    image: friesImg,
    items: [
      { name: "Hot Wings (10 pcs)", price: "Rs. 500" },
      { name: "Hot Wings (5 pcs)", price: "Rs. 250" },
      { name: "Nuggets (10 pcs)", price: "Rs. 400" },
      { name: "Nuggets (5 pcs)", price: "Rs. 250" },
      { name: "Fried Thai Piece", price: "Rs. 270" },
      { name: "Cheese Slice", price: "Rs. 50" },
    ],
  },
  {
    id: "potato",
    title: "Potato Break",
    image: friesImg,
    items: [
      { name: "Regular Fries", price: "Rs. 200", image: friesImg },
      { name: "Large Fries", price: "Rs. 300", image: friesImg },
      { name: "Family Fries", price: "Rs. 400", image: friesImg },
      { name: "Loaded Fries (Small)", price: "Rs. 400", image: friesImg },
      { name: "Loaded Fries (Large)", price: "Rs. 600", image: friesImg },
    ],
  },
  {
    id: "pastas",
    title: "Pastas",
    items: [
      { name: "Creamy Pasta", price: "Rs. 450", desc: "Chicken chunks, capsicum, olives, chicken sausages & white sauce." },
      { name: "Crunchy Pasta", price: "Rs. 550", desc: "Crispy chicken chunks, capsicum, olives, chicken sausages & white sauce." },
    ],
  },
  {
    id: "rolls",
    title: "Rolls",
    items: [
      { name: "Spring Roll", price: "Rs. 400" },
      { name: "Malai Roll", price: "Rs. 350" },
      { name: "Chicken Paratha Roll", price: "Rs. 300" },
      { name: "Twister Paratha Roll", price: "Rs. 400" },
    ],
  },
  {
    id: "dips",
    title: "Dips (Rs. 50 each)",
    items: [
      { name: "Chipotle", price: "Rs. 50" },
      { name: "Plain Mayo", price: "Rs. 50" },
      { name: "Garlic Mayo", price: "Rs. 50" },
      { name: "Thousand Island", price: "Rs. 50" },
      { name: "BBQ", price: "Rs. 50" },
    ],
  },
];

export const REVIEWS = [
  { name: "Syra Faizan", rating: 5, text: "Amazing taste, great service 👍 Loaded fries were unreal. Delivery was super quick too.", date: "2 weeks ago" },
  { name: "Daniyal Khan", rating: 5, text: "Tight tongue love from Karachi 🩷 The Mexican Wrap is genuinely one of the best I've had in Lahore.", date: "2 months ago" },
  { name: "M Mobine Ameen", rating: 4, text: "Having a great experience — food was too good. Zinger burger is crispy and juicy.", date: "3 months ago" },
  { name: "Raza Mughal", rating: 5, text: "Delicious food. Ordered Deal 3 for family night — everyone was full and happy.", date: "Just now" },
  { name: "Ayesha Malik", rating: 5, text: "Best late night fast food spot in Karim Park. Malai Boti Pizza is a must try!", date: "1 month ago" },
  { name: "Hamza Shahid", rating: 4, text: "Free delivery and open till 3AM — perfect after a long shift. Portions are generous.", date: "3 weeks ago" },
];
