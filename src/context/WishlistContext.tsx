import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

import type { Product } from '@/constants/product';

type WishlistContextType = {
  wishlistItems: Product[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const toggleWishlist = (product: Product) => {
    setWishlistItems((items) =>
      items.some((item) => item.id === product.id)
        ? items.filter((item) => item.id !== product.id)
        : [product, ...items]
    );
  };

  const value = useMemo(
    () => ({
      wishlistItems,
      isWishlisted: (productId: string) =>
        wishlistItems.some((item) => item.id === productId),
      toggleWishlist,
    }),
    [wishlistItems]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used inside WishlistProvider');
  }

  return context;
}
