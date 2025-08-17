export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'basic' | 'standard' | 'premium' | 'smart';
  features: string[];
  specifications: {
    [key: string]: string;
  };
  images: string[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  stockQuantity: number;
  discount?: {
    percentage: number;
    validUntil: string;
  };
  reviews: {
    rating: number;
    comment: string;
    user: string;
    date: string;
  }[];
}

export const products: Product[] = [
  {
    id: 'basic-1-v3',
    name: 'Urban Rider Basic',
    price: 599,
    description: 'ISI-certified helmet with ventilation channels',
    category: 'basic',
    features: ['Adjustable straps', 'Removable padding', 'UV-protected visor'],
    specifications: {
      'Material': 'ABS Plastic',
      'Weight': '850g',
      'Certification': 'ISI Marked'
    },
    images: [
      '/assets/images/helmets/product/BASIC-1.jpg',
      '/assets/images/helmets/product/BASIC-2.jpg'
    ],
    stockStatus: 'In Stock',
    stockQuantity: 50,
    discount: {
      percentage: 10,
      validUntil: '2024-03-31'
    },
    reviews: []
  },
  {
    id: 'basic-2-v3',
    name: 'City Commuter',
    price: 799,
    description: 'Lightweight urban helmet with quick-release visor',
    category: 'basic',
    features: ['Dual-density EPS', 'Micro-fit ratchet', '3D molded cheek pads'],
    specifications: {
      'Material': 'Polycarbonate',
      'Weight': '1100g',
      'Vents': '8'
    },
    images: ['/assets/images/helmets/product/BASIC-3.jpg', '/assets/images/helmets/product/BASIC-4.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 45,
    reviews: []
  },
  {
    id: 'basic-3',
    name: 'Road Guardian',
    price: 899,
    description: 'Reinforced shell with enhanced impact protection',
    category: 'basic',
    features: ['Double D-ring closure', 'Moisture-wicking liner'],
    specifications: {
      'Material': 'ABS Plastic',
      'Weight': '950g',
      'Certification': 'ISI Marked'
    },
    images: ['/assets/images/helmets/product/BASIC-5.jpg', '/assets/images/helmets/product/BASIC-6.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 30,
    reviews: []
  },
  {
    id: 'basic-9',
    name: 'Commuter Essential',
    price: 899,
    description: 'Lightweight design with reinforced chin strap',
    category: 'basic',
    features: ['Double D-ring closure', 'Moisture-wicking liner'],
    specifications: {
      'Material': 'Polycarbonate',
      'Weight': '950g',
      'Vents': '5'
    },
    images: ['/assets/images/helmets/product/BASIC-7.jpg', '/assets/images/helmets/product/BASIC-8.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 25,
    reviews: []
  },
  {
    id: 'smart-1',
    name: 'Pro Guardian Smart',
    price: 6499,
    description: 'Bluetooth-enabled smart helmet with SOS alerts',
    category: 'smart',
    features: ['Crash detection', 'Built-in speakers', 'Mobile app integration'],
    specifications: {
      'Connectivity': 'Bluetooth 5.0',
      'Battery': '8 hours',
      'Sensors': 'Accelerometer + Gyroscope'
    },
    images: ['/assets/images/helmets/product/SMART-1.jpg', '/assets/images/helmets/product/SMART-2.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 15,
    reviews: []
  },
  {
    id: 'smart-2',
    name: 'NavGuard Pro',
    price: 5499,
    description: 'GPS-enabled helmet with turn-by-turn navigation',
    category: 'smart',
    features: ['Integrated HUD', 'Voice guidance', 'Weather updates'],
    specifications: {
      'Display': 'OLED',
      'Battery': '10hrs',
      'Waterproof': 'IP65'
    },
    images: ['/assets/images/helmets/product/SMART-3.jpg', '/assets/images/helmets/product/SMART-4.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 10,
    reviews: []
  },
  {
    id: 'smart-9-v3',
    name: 'Aegis Pro 2.0',
    price: 6999,
    description: 'Advanced smart helmet with GPS tracking',
    category: 'smart',
    features: ['Live location sharing', 'Anti-theft alarm', 'LED indicators'],
    specifications: {
      'GPS': 'Yes',
      'Waterproof': 'IP67',
      'Charging': 'USB-C'
    },
    images: ['/assets/images/helmets/product/SMART-5.jpg', '/assets/images/helmets/product/SMART-1.jpg'],
    stockStatus: 'Low Stock',
    stockQuantity: 5,
    reviews: []
  },
  {
    id: 'basic-helmet-1',
    name: 'Basic Safety Helmet',
    price: 500,
    description: 'Entry-level helmet with essential safety features',
    category: 'basic',
    features: ['Impact resistant shell', 'Adjustable straps', 'Basic ventilation'],
    specifications: {
      'Shell Material': 'ABS Plastic',
      'Weight': '800g',
      'Certification': 'ISI Certified',
      'Size Range': 'M, L',
    },
    images: ['/assets/images/helmets/product/BASIC-9.jpg', '/assets/images/helmets/product/BASIC-1.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 60,
    reviews: [
      {
        rating: 4,
        comment: 'Good basic helmet for daily use',
        user: 'Rahul S.',
        date: '2024-01-15'
      }
    ]
  },
  {
    id: 'basic-helmet-2',
    name: 'Comfort Basic Helmet',
    price: 750,
    description: 'Comfortable basic helmet with improved padding',
    category: 'basic',
    features: ['Enhanced padding', 'Quick-release buckle', 'Multiple color options'],
    specifications: {
      'Shell Material': 'ABS Plastic',
      'Weight': '850g',
      'Certification': 'ISI Certified',
      'Size Range': 'S, M, L',
    },
    images: ['/assets/images/helmets/product/BASIC-2.jpg', '/assets/images/helmets/product/BASIC-3.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 40,
    reviews: []
  },
  {
    id: 'standard-helmet-1',
    name: 'Standard Protection Helmet',
    price: 1200,
    description: 'Mid-range helmet with improved safety features',
    category: 'standard',
    features: ['Reinforced shell', 'Advanced ventilation', 'Anti-scratch visor'],
    specifications: {
      'Shell Material': 'Polycarbonate',
      'Weight': '1200g',
      'Certification': 'DOT Certified',
      'Size Range': 'S, M, L, XL',
    },
    images: ['/assets/images/helmets/product/BASIC-4.jpg', '/assets/images/helmets/product/BASIC-5.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 35,
    reviews: []
  },
  {
    id: 'standard-helmet-2',
    name: 'Aerodynamic Standard Helmet',
    price: 1500,
    description: 'Streamlined design with good ventilation',
    category: 'standard',
    features: ['Aerodynamic design', 'Moisture-wicking liner', 'UV-protected visor'],
    specifications: {
      'Shell Material': 'Polycarbonate',
      'Weight': '1150g',
      'Certification': 'DOT Certified',
      'Size Range': 'M, L, XL',
    },
    images: ['/assets/images/helmets/product/BASIC-6.jpg', '/assets/images/helmets/product/BASIC-7.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 30,
    reviews: []
  },
  {
    id: 'premium-helmet-1',
    name: 'Premium Safety Helmet',
    price: 2500,
    description: 'High-end helmet with superior protection',
    category: 'premium',
    features: ['Carbon fiber shell', 'Premium padding', 'Anti-fog visor'],
    specifications: {
      'Shell Material': 'Carbon Fiber Composite',
      'Weight': '1300g',
      'Certification': 'ECE Certified',
      'Size Range': 'S, M, L, XL',
    },
    images: ['/assets/images/helmets/product/SMART-3.jpg', '/assets/images/helmets/product/SMART-4.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 20,
    reviews: []
  },
  {
    id: 'premium-helmet-2',
    name: 'Elite Racing Helmet',
    price: 3000,
    description: 'Professional-grade helmet for serious riders',
    category: 'premium',
    features: ['Race-spec aerodynamics', 'Emergency cheek pad release', 'Pro-grade ventilation', 'Titanium D-rings'],
    specifications: {
      'Shell Material': 'Carbon Fiber + Kevlar',
      'Weight': '1250g',
      'Certification': 'ECE R22.06',
      'Size Range': 'XS, S, M, L, XL'
    },
    images: ['/assets/images/helmets/product/SMART-5.jpg', '/assets/images/helmets/product/SMART-1.jpg'],
    stockStatus: 'In Stock',
    stockQuantity: 15,
    reviews: []
  }
];