import { Product, BlogPost, NotificationItem } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'glacier-blue',
    name: 'Glacier blue(Active)',
    category: 'Active',
    flavor: 'Refreshing Berry Blend',
    description: 'Refreshing berry blend infused with 15g whey isolate for peak recovery.',
    price: 99,
    formattedPrice: '99/-',
    proteinGrams: 15,
    image: '/images/product_glacier_blue.jpg',
    badge: 'Best Seller',
    inStock: true,
    volume: '500 ml',
    nutrition: {
      calories: 70,
      protein: '15g',
      carbs: '< 1g',
      sugar: '0g',
      fat: '0g',
      sodium: '110mg',
      potassium: '140mg'
    },
    highlights: [
      '15g 100% Pure Whey Protein Isolate',
      'Zero Added Sugar & Zero Fats',
      'Infused with 4 Essential Electrolytes',
      'Light, crisp, non-chalky berry infusion'
    ]
  },
  {
    id: 'mango-sunshine',
    name: 'Mango Sunshine (Elite)',
    category: 'Elite',
    flavor: 'Vibrant Citrus & Mango',
    description: 'Vibrant citrus flavors combined with high-quality protein for active lifestyles.',
    price: 150,
    formattedPrice: '150/-',
    proteinGrams: 25,
    image: '/images/product_mango_sunshine.jpg',
    badge: 'Pro Tier',
    inStock: true,
    volume: '500 ml',
    nutrition: {
      calories: 110,
      protein: '25g',
      carbs: '< 1g',
      sugar: '0g',
      fat: '0g',
      sodium: '130mg',
      potassium: '180mg'
    },
    highlights: [
      '25g High-Potency Ultra-Filtered Whey Isolate',
      'Vibrant Alphonso Mango & Sun-Kissed Citrus notes',
      'BCAA & EAA Complex for Rapid Muscle Synthesis',
      'Zero Sugar & Keto Friendly'
    ]
  },
  {
    id: 'aqua-bliss-active',
    name: 'Aqua bliss (Active)',
    category: 'Active',
    flavor: 'Exotic Tropical Island Blend',
    description: 'Exotic tropical blend with essential electrolytes and 15g of protein.',
    price: 99,
    formattedPrice: '99/-',
    image: '/images/product_aqua_bliss_active.jpg',
    badge: 'Signature',
    proteinGrams: 15,
    inStock: true,
    volume: '500 ml',
    nutrition: {
      calories: 72,
      protein: '15g',
      carbs: '< 1g',
      sugar: '0g',
      fat: '0g',
      sodium: '115mg',
      potassium: '150mg'
    },
    highlights: [
      '15g Premium Grass-Fed Whey Isolate',
      'Electrolyte Complex for Rapid Fluid Hydration',
      'Guava, Passion Fruit & Pineapple essences',
      'Fast Gastric Emptying — No Bloating'
    ]
  }
];

export const RANGES = [
  {
    id: 'performance',
    title: 'Performance Focus',
    subtitle: 'High Output',
    description: 'Engineered for intense cardio, high-volume strength sessions, and competitive sports where sustained endurance is critical.',
    image: '/images/range_performance.jpg',
    protein: '25g Whey Isolate',
    tag: 'Elite Tier'
  },
  {
    id: 'vitality',
    title: 'Everyday Vitality',
    subtitle: 'Daily Hydration',
    description: 'Formulated for your daily routine, desk endurance, morning runs, and healthy snacking without extra calories or dairy heaviness.',
    image: '/images/range_vitality.jpg',
    protein: '15g Whey Isolate',
    tag: 'Active Tier'
  },
  {
    id: 'recovery',
    title: 'Rapid Recovery',
    subtitle: 'Post-Workout Refuel',
    description: 'Immediate amino acid uptake designed to halt muscle catabolism and restore lost intra-cellular hydration in record time.',
    image: '/images/range_recovery.jpg',
    protein: 'Essential Electrolytes',
    tag: 'Zero Lag'
  }
];

export const SCIENTIFIC_PILLARS = [
  {
    id: 'p1',
    title: '15g and 25g Premium Protein Isolate',
    description: 'Fuel your muscles with high-quality whey isolate designed for rapid absorption and clean recovery after any high-intensity activity.',
    stat: '100% Isolate',
    metric: 'Rapid Bioavailability'
  },
  {
    id: 'p2',
    title: 'Advanced Electrolyte Blend',
    description: 'Maintain optimal fluid balance and prevent cramping with essential minerals that keep your body performing at its highest level.',
    stat: '4 Minerals',
    metric: 'Na+ / K+ / Mg++ / Ca++'
  },
  {
    id: 'p3',
    title: 'Zero Sugar, Zero Recovery Lag',
    description: 'Enjoy refreshing hydration without the sugar crash. Our formula is sweetened naturally to support your health goals with pure energy.',
    stat: '0g Sugar',
    metric: 'Clean Glycemic Response'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Why Clear Protein Water is Replacing Heavy Dairy Shakes',
    slug: 'clear-protein-vs-shakes',
    date: 'March 14, 2026',
    readTime: '4 min read',
    category: 'Nutrition Science',
    image: '/images/range_performance.jpg',
    summary: 'Discover how micro-filtered whey isolate provides instant peptide delivery without gastrointestinal distress or heaviness.',
    content: `For decades, athletes accepted thick, milky, bloating protein shakes as a necessary evil. But sports science has evolved. 
    
Aqua Bliss utilizes advanced cold micro-filtration that isolates the purest whey peptides while discarding all lactose, casein, and fats. The result is crystal-clear hydration that tastes like crisp fruit water while packing 15g to 25g of bioavailable protein.

When consumed intra or post-workout, clear protein enters the bloodstream twice as rapidly as standard whey concentrate, delivering branched-chain amino acids directly to muscle tissue without demanding heavy digestion.`
  },
  {
    id: 'b2',
    title: 'Electrolytes vs. Plain Water: What Research Reveals',
    slug: 'electrolytes-science',
    date: 'March 8, 2026',
    readTime: '5 min read',
    category: 'Hydration',
    image: '/images/range_recovery.jpg',
    summary: 'Drinking plain water during intense sweat loss can actually dilute plasma sodium. Here is why balanced osmolarity matters.',
    content: `When you sweat, your body does not just lose water—it expels crucial ionic minerals including sodium, potassium, and magnesium. 

Drinking plain tap water in high volumes can lead to hyponatremia and sluggish recovery. Aqua Bliss matches the natural osmotic pressure of human cellular fluids, ensuring that every drop is absorbed deeply into muscle tissue rather than flushed out.`
  },
  {
    id: 'b3',
    title: 'The 30-Minute Recovery Window: Myth or Biological Fact?',
    slug: 'recovery-window',
    date: 'February 27, 2026',
    readTime: '3 min read',
    category: 'Performance',
    image: '/images/range_vitality.jpg',
    summary: 'How rapid-acting whey isolate capitalizes on post-exercise insulin sensitivity and muscle protein synthesis.',
    content: `While the legendary "anabolic window" is broader than previously thought, the first 45 minutes post-exercise remain the peak phase for muscle glycogen re-synthesis and cellular hydration. 

With zero sugars and zero lag, Aqua Bliss provides the exact amino acid surge needed to kickstart tissue repair while keeping you refreshed and energized for the rest of your day.`
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Welcome to Aqua Bliss!',
    description: 'Use coupon code AQUAFIRST for 10% off your first pack of Glacier Blue or Mango Sunshine.',
    timestamp: 'Just now',
    read: false,
    type: 'promo'
  },
  {
    id: 'n2',
    title: 'New Flavor Alert',
    description: 'Mango Sunshine (Elite) with 25g Whey Isolate is now available for nationwide express delivery.',
    timestamp: '2 hours ago',
    read: false,
    type: 'announcement'
  },
  {
    id: 'n3',
    title: 'Free Shipping Threshold',
    description: 'Enjoy complimentary express shipping on all orders above ₹499/-.',
    timestamp: '1 day ago',
    read: true,
    type: 'order'
  }
];
