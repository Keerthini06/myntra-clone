import { Stack } from 'expo-router';

import { CartProvider } from '@/context/CartContext';
import { RecentlyViewedProvider } from '@/context/RecentlyViewedContext';
import { WishlistProvider } from '@/context/WishlistContext';

export default function RootLayout() {
  return (
    <WishlistProvider>
      <RecentlyViewedProvider>
        <CartProvider>
          <Stack
            initialRouteName="login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="login" />
            <Stack.Screen name="index" />
            <Stack.Screen name="product/[id]" />
            <Stack.Screen name="cart" />
            <Stack.Screen name="checkout" />
            <Stack.Screen name="orders" />
            <Stack.Screen name="wishlist" />
          </Stack>
        </CartProvider>
      </RecentlyViewedProvider>
    </WishlistProvider>
  );
}