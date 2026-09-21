import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { useWishlist } from '@/context/WishlistContext';

export default function WishlistScreen() {
  const router = useRouter();
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();

  const openProduct = (id: string) =>
    router.push({ pathname: '/product/[id]', params: { id } });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.title}>MY WISHLIST</Text>
        <View style={styles.headerSpace} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {wishlistItems.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>♡</Text>
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptyText}>Save products you love to find them quickly.</Text>
            <Pressable style={styles.shopButton} onPress={() => router.replace('/')}>
              <Text style={styles.shopButtonText}>START SHOPPING</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>SAVED ITEMS ({wishlistItems.length})</Text>
            <View style={styles.grid}>
              {wishlistItems.map((product) => (
                <View key={product.id} style={styles.card}>
                  <Pressable onPress={() => openProduct(product.id)}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <Text style={styles.brand}>{product.brand}</Text>
                    <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
                    <Text style={styles.price}>₹{product.price}</Text>
                  </Pressable>
                  <Pressable style={styles.removeButton} onPress={() => toggleWishlist(product)}>
                    <Text style={styles.removeText}>REMOVE</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          </>
        )}

        {recentlyViewed.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>RECENTLY VIEWED</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentRow}>
              {recentlyViewed.map((product) => (
                <Pressable key={product.id} style={styles.recentCard} onPress={() => openProduct(product.id)}>
                  <Image source={{ uri: product.image }} style={styles.recentImage} />
                  <Text style={styles.recentName} numberOfLines={1}>{product.name}</Text>
                  <Text style={styles.recentPrice}>₹{product.price}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F7' },
  header: { height: 68, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  backButton: { width: 42, height: 42, justifyContent: 'center', alignItems: 'center' },
  backIcon: { fontSize: 34, color: '#111111' },
  title: { fontSize: 17, fontWeight: '900', color: '#111111' },
  headerSpace: { width: 42 },
  content: { padding: 14, paddingBottom: 34 },
  sectionTitle: { marginTop: 8, marginBottom: 12, fontSize: 13, fontWeight: '900', color: '#555555' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '48%', overflow: 'hidden', backgroundColor: '#FFFFFF', borderRadius: 12, paddingBottom: 12 },
  image: { width: '100%', height: 210, backgroundColor: '#EEEEEE' },
  brand: { marginHorizontal: 11, marginTop: 10, fontSize: 13, fontWeight: '800', color: '#222222' },
  name: { marginHorizontal: 11, marginTop: 3, fontSize: 13, color: '#666666' },
  price: { marginHorizontal: 11, marginTop: 6, fontSize: 14, fontWeight: '900', color: '#111111' },
  removeButton: { marginHorizontal: 11, marginTop: 12, borderWidth: 1, borderColor: '#DDDDDD', borderRadius: 6, paddingVertical: 9, alignItems: 'center' },
  removeText: { fontSize: 11, fontWeight: '900', color: '#FF3F6C' },
  empty: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, padding: 34, marginTop: 8 },
  emptyIcon: { fontSize: 48, color: '#FF3F6C' },
  emptyTitle: { marginTop: 12, fontSize: 20, fontWeight: '900', color: '#111111' },
  emptyText: { marginTop: 7, textAlign: 'center', fontSize: 14, color: '#777777' },
  shopButton: { marginTop: 22, backgroundColor: '#FF3F6C', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 14 },
  shopButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
  recentRow: { gap: 12, paddingBottom: 8 },
  recentCard: { width: 132, overflow: 'hidden', backgroundColor: '#FFFFFF', borderRadius: 10, paddingBottom: 10 },
  recentImage: { width: 132, height: 160, backgroundColor: '#EEEEEE' },
  recentName: { marginHorizontal: 9, marginTop: 8, fontSize: 12, fontWeight: '700', color: '#222222' },
  recentPrice: { marginHorizontal: 9, marginTop: 4, fontSize: 12, fontWeight: '900', color: '#111111' },
});
