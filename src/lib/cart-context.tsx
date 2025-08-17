'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { Product } from './products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };
    }

    case 'REMOVE_FROM_CART': {
      const item = state.items.find(item => item.product.id === action.payload);
      if (!item) return state;

      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
        total: state.total - (item.product.price * item.quantity)
      };
    }

    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.product.id === action.payload.productId);
      if (!item) return state;

      const quantityDiff = action.payload.quantity - item.quantity;

      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.product.price * quantityDiff)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // Load from localStorage after hydration
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      const parsedState = JSON.parse(saved);
      // Restore cart state
      parsedState.items.forEach((item: any) => {
        dispatch({ type: 'ADD_TO_CART', payload: item.product });
        if (item.quantity > 1) {
          dispatch({ 
            type: 'UPDATE_QUANTITY', 
            payload: { productId: item.product.id, quantity: item.quantity }
          });
        }
      });
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state, isHydrated]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}