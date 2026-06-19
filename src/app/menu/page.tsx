import { getDB, MenuItem } from '@/lib/db'
import TopBar from '@/components/TopBar'
import Footer from '@/components/Footer'
import CategoryNav from '@/components/CategoryNav'
import MenuClient from './MenuClient'

const CATEGORIES = ['starters','mains','burgers','pizza','pasta','salads','desserts','drinks','specials']
const CAT_LABELS: Record<string,string> = {
  starters:'Starters', mains:'Mains', burgers:'Burgers',
  pizza:'Pizza', pasta:'Pasta', salads:'Salads',
  desserts:'Desserts', drinks:'Drinks', specials:'Specials'
}

const MOCK_ITEMS: MenuItem[] = [
  { id:1, name:'Foie Gras Torchon', description:'Silky duck liver torchon, Sauternes gelee, brioche toast, fleur de sel', price:18, category:'starters', image_url:'https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=600&q=80', tags:'chefs-pick', is_available:1, is_featured:1, sort_order:1 },
  { id:2, name:'Soupe à l\'Oignon', description:'Classic French onion soup, Gruyère crust, house-baked crouton', price:14, category:'starters', image_url:'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80', tags:'', is_available:1, is_featured:0, sort_order:2 },
  { id:3, name:'Tartare de Bœuf', description:'Hand-cut AAA beef tartare, capers, shallots, Dijon, egg yolk, crostini', price:19, category:'starters', image_url:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', tags:'chefs-pick', is_available:1, is_featured:1, sort_order:3 },
  { id:4, name:'Magret de Canard', description:'Duck breast, cherry gastrique, celery root purée, haricots verts', price:38, category:'mains', image_url:'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', tags:'chefs-pick', is_available:1, is_featured:1, sort_order:1 },
  { id:5, name:'Filet de Bœuf Wellington', description:'6oz beef tenderloin, mushroom duxelles, prosciutto, golden pastry, red wine jus', price:52, category:'mains', image_url:'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80', tags:'chefs-pick', is_available:1, is_featured:1, sort_order:2 },
  { id:6, name:'Saumon de l\'Atlantique', description:'Pan-seared Atlantic salmon, lemon beurre blanc, asparagus, fingerling potatoes', price:34, category:'mains', image_url:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80', tags:'gluten-free', is_available:1, is_featured:0, sort_order:3 },
  { id:7, name:'Le Classique', description:'AAA beef patty, aged cheddar, caramelized onions, house sauce, brioche bun', price:18, category:'burgers', image_url:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', tags:'', is_available:1, is_featured:1, sort_order:1 },
  { id:8, name:'Truffle Royale', description:'Wagyu beef, black truffle mayo, Gruyère, arugula, gold brioche', price:28, category:'burgers', image_url:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80', tags:'chefs-pick', is_available:1, is_featured:1, sort_order:2 },
  { id:9, name:'Spicy Montréalais', description:'Double smash patty, habanero aioli, jalapeños, pepperjack, pickles', price:21, category:'burgers', image_url:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', tags:'spicy', is_available:1, is_featured:0, sort_order:3 },
  { id:10, name:'Margherita Classique', description:'San Marzano tomato, fior di latte, fresh basil, extra virgin olive oil', price:19, category:'pizza', image_url:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80', tags:'vegan', is_available:1, is_featured:0, sort_order:1 },
  { id:11, name:'Truffe Noire', description:'Cream base, black truffle, fontina, wild mushrooms, chive', price:31, category:'pizza', image_url:'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80', tags:'chefs-pick', is_available:1, is_featured:1, sort_order:2 },
  { id:12, name:'Tagliatelle al Ragù', description:'Hand-rolled tagliatelle, slow-braised beef ragù, Parmesan, basil', price:24, category:'pasta', image_url:'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=600&q=80', tags:'', is_available:1, is_featured:1, sort_order:1 },
  { id:13, name:'Linguine alle Vongole', description:'Fresh clams, white wine, garlic, parsley, chili, linguine', price:27, category:'pasta', image_url:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80', tags:'spicy', is_available:1, is_featured:0, sort_order:2 },
  { id:14, name:'César Maison', description:'Romaine, house Caesar dressing, Parmesan tuile, house-baked croutons', price:16, category:'salads', image_url:'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&q=80', tags:'', is_available:1, is_featured:0, sort_order:1 },
  { id:15, name:'Salade Niçoise', description:'Seared tuna, green beans, olives, egg, potato, Dijon vinaigrette', price:22, category:'salads', image_url:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', tags:'gluten-free', is_available:1, is_featured:0, sort_order:2 },
  { id:16, name:'Crème Brûlée', description:'Classic Madagascar vanilla bean crème brûlée, caramelized sugar crust', price:12, category:'desserts', image_url:'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80', tags:'gluten-free', is_available:1, is_featured:1, sort_order:1 },
  { id:17, name:'Moelleux au Chocolat', description:'Warm dark chocolate fondant, vanilla bean ice cream, salted caramel', price:14, category:'desserts', image_url:'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80', tags:'chefs-pick', is_available:1, is_featured:1, sort_order:2 },
  { id:18, name:'Cocktail Signature', description:'Bourbon, maple syrup, Peychaud\'s bitters, smoked rosemary', price:16, category:'drinks', image_url:'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80', tags:'', is_available:1, is_featured:0, sort_order:1 },
  { id:19, name:'Vin Rouge Maison', description:'Glass of our house-selected Côtes du Rhône', price:12, category:'drinks', image_url:'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80', tags:'vegan,gluten-free', is_available:1, is_featured:0, sort_order:2 },
  { id:20, name:'Menu Dégustation', description:'7-course chef tasting menu, wine pairing optional', price:95, category:'specials', image_url:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', tags:'chefs-pick', is_available:1, is_featured:1, sort_order:1 },
]

async function getAllMenuItems(): Promise<Record<string, MenuItem[]>> {
  try {
    const db = getDB()
    const result: Record<string, MenuItem[]> = {}
    for (const cat of CATEGORIES) {
      const [rows] = await db.execute(
        'SELECT * FROM menu_items WHERE category=? AND is_available=1 ORDER BY sort_order ASC, id ASC',
        [cat]
      ) as [MenuItem[], unknown]
      if (rows.length) result[cat] = rows
    }
    if (Object.keys(result).length > 0) return result
  } catch {
    // DB not connected — fall through to mock data
  }

  const mock: Record<string, MenuItem[]> = {}
  for (const cat of CATEGORIES) {
    const catItems = MOCK_ITEMS.filter(i => i.category === cat)
    if (catItems.length) mock[cat] = catItems
  }
  return mock
}

export const metadata = {
  title: 'Menu',
  description: 'Explore our French-inspired menu featuring local Québec ingredients — starters, mains, burgers, desserts and more.',
}

export default async function MenuPage() {
  const menuByCategory = await getAllMenuItems()
  const availableCats  = Object.keys(menuByCategory)

  return (
    <>
      <TopBar />
      <CategoryNav categories={availableCats} labels={CAT_LABELS} />
      <MenuClient menuByCategory={menuByCategory} />
      <Footer />
    </>
  )
}