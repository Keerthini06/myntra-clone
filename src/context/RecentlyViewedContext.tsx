import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { Product } from '@/constants/product';

type RecentlyViewedContextType = {
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
};

const RecentlyViewedContext =
  createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed((currentProducts) => {
      // Remove the product if it already exists
      const filteredProducts = currentProducts.filter(
        (item) => item.id !== product.id
      );

      // Put the newly viewed product at the beginning
      const updatedProducts = [product, ...filteredProducts];

      // Keep only the latest 20 products
      return updatedProducts.slice(0, 20);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const value = useMemo(
    () => ({
      recentlyViewed,
      addRecentlyViewed,
      clearRecentlyViewed,
    }),
    [recentlyViewed]
  );

  return (
    <RecentlyViewedContext.Provider value={value}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error(
      'useRecentlyViewed must be used inside RecentlyViewedProvider'
    );
  }

  return context;
}