import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import type { Product } from '@/constants/product';

export type CartItem = Product & {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  cartPrice: number;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: 'Confirmed';
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    selectedSize: string,
    selectedColor: string
  ) => void;
  decreaseQuantity: (item: CartItem) => void;
  increaseQuantity: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;

  savedItems: CartItem[];
  moveToSaved: (item: CartItem) => void;
  moveToCart: (item: CartItem) => void;

  cartCount: number;
  cartTotal: number;
  priceChangedItems: CartItem[];

  clearCart: () => void;

  orders: Order[];
  placeOrder: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (
    product: Product,
    selectedSize: string,
    selectedColor: string
  ) => {
    if (product.stock <= 0) {
      return;
    }

    setCartItems((currentItems) => {
      const matchingIndex = currentItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (matchingIndex === -1) {
        return [
          ...currentItems,
          {
            ...product,
            selectedSize,
            selectedColor,
            quantity: 1,
            cartPrice: product.price,
          },
        ];
      }

      return currentItems.map((item, index) => {
        if (index !== matchingIndex) {
          return item;
        }

        if (item.quantity >= product.stock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
    });
  };

  const isSameItem = (first: CartItem, second: CartItem) =>
    first.id === second.id &&
    first.selectedSize === second.selectedSize &&
    first.selectedColor === second.selectedColor;

  const increaseQuantity = (item: CartItem) => {
    setCartItems((items) =>
      items.map((cartItem) => {
        if (!isSameItem(cartItem, item)) {
          return cartItem;
        }

        if (cartItem.quantity >= cartItem.stock) {
          return cartItem;
        }

        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      })
    );
  };

  const decreaseQuantity = (item: CartItem) => {
    setCartItems((items) =>
      items.flatMap((cartItem) => {
        if (!isSameItem(cartItem, item)) {
          return [cartItem];
        }

        return cartItem.quantity === 1
          ? []
          : [{ ...cartItem, quantity: cartItem.quantity - 1 }];
      })
    );
  };

  const removeFromCart = (item: CartItem) => {
    setCartItems((items) =>
      items.filter((cartItem) => !isSameItem(cartItem, item))
    );
  };

  const moveToSaved = (item: CartItem) => {
    removeFromCart(item);

    setSavedItems((items) =>
      items.some((savedItem) => isSameItem(savedItem, item))
        ? items
        : [...items, item]
    );
  };

  const moveToCart = (item: CartItem) => {
    setSavedItems((items) =>
      items.filter((savedItem) => !isSameItem(savedItem, item))
    );

    setCartItems((items) =>
      items.some((cartItem) => isSameItem(cartItem, item))
        ? items
        : [...items, item]
    );
  };

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const priceChangedItems = useMemo(
    () => cartItems.filter((item) => item.price !== item.cartPrice),
    [cartItems]
  );

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = () => {
    if (cartItems.length === 0) {
      return;
    }

    setOrders((currentOrders) => [
      {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        total: cartTotal,
        createdAt: new Date().toISOString(),
        status: 'Confirmed',
      },
      ...currentOrders,
    ]);

    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        savedItems,
        moveToSaved,
        moveToCart,
        cartCount,
        cartTotal,
        priceChangedItems,
        clearCart,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error('useCart must be used inside CartProvider');
  }

  return cart;
}