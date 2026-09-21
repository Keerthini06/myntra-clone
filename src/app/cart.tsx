import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { CartItem } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';

function CartCard({ item, saved = false }: { item: CartItem; saved?: boolean }) {
  const { decreaseQuantity, increaseQuantity, moveToCart, moveToSaved, removeFromCart } = useCart();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.itemDetails}>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.variant}>Size: {item.selectedSize}  |  {item.selectedColor}</Text>
        <Text style={styles.price}>₹{item.price}</Text>

        {saved ? (
          <Pressable style={styles.primaryAction} onPress={() => moveToCart(item)}>
            <Text style={styles.primaryActionText}>MOVE TO BAG</Text>
          </Pressable>
        ) : (
          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <Pressable style={styles.quantityButton} onPress={() => decreaseQuantity(item)}>
              <Text style={styles.quantityButtonText}>−</Text>
            </Pressable>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Pressable style={styles.quantityButton} onPress={() => increaseQuantity(item)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.linkRow}>
          {!saved && <Pressable onPress={() => moveToSaved(item)}><Text style={styles.link}>SAVE FOR LATER</Text></Pressable>}
          <Pressable onPress={() => (saved ? moveToCart(item) : removeFromCart(item))}>
            <Text style={styles.link}>{saved ? 'MOVE TO BAG' : 'REMOVE'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function CartScreen() {
  const router = useRouter();
  const { cartCount, cartItems, cartTotal, savedItems } = useCart();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}><Text style={styles.backIcon}>‹</Text></Pressable>
        <View><Text style={styles.title}>MY BAG</Text><Text style={styles.subtitle}>{cartCount} {cartCount === 1 ? 'item' : 'items'}</Text></View>
        <View style={styles.headerSpace} />
      </View>

      {cartItems.length === 0 && savedItems.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🛍️</Text>
          <Text style={styles.emptyTitle}>Your bag is empty</Text>
          <Text style={styles.emptyText}>Add something you love and it will appear here.</Text>
          <Pressable style={styles.shopButton} onPress={() => router.replace('/')}><Text style={styles.shopButtonText}>CONTINUE SHOPPING</Text></Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {cartItems.map((item) => <CartCard key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />)}
          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>PRICE DETAILS</Text>
            <View style={styles.totalRow}><Text style={styles.totalText}>Bag total</Text><Text style={styles.totalText}>₹{cartTotal}</Text></View>
            <View style={styles.totalRow}><Text style={styles.totalText}>Delivery</Text><Text style={styles.free}>FREE</Text></View>
            <View style={styles.divider} />
            <View style={styles.totalRow}><Text style={styles.grandTotal}>Total amount</Text><Text style={styles.grandTotal}>₹{cartTotal}</Text></View>
          </View>
          <Pressable style={styles.placeOrder} onPress={() => router.push('/checkout')}><Text style={styles.placeOrderText}>PLACE ORDER</Text></Pressable>

          {savedItems.length > 0 && <View style={styles.savedSection}><Text style={styles.savedTitle}>SAVED FOR LATER ({savedItems.length})</Text>{savedItems.map((item) => <CartCard key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} item={item} saved />)}</View>}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F7' }, header: { height: 68, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#EEEEEE' }, backButton: { width: 42, height: 42, justifyContent: 'center', alignItems: 'center' }, backIcon: { fontSize: 34, color: '#111111' }, headerSpace: { width: 42 }, title: { fontSize: 17, fontWeight: '900', textAlign: 'center' }, subtitle: { color: '#777777', fontSize: 12, textAlign: 'center', marginTop: 2 }, content: { padding: 14, paddingBottom: 35 }, card: { flexDirection: 'row', padding: 12, backgroundColor: '#FFFFFF', borderRadius: 12, marginBottom: 12 }, image: { width: 100, height: 135, borderRadius: 8, backgroundColor: '#EEEEEE' }, itemDetails: { flex: 1, marginLeft: 12 }, brand: { fontSize: 15, fontWeight: '800', color: '#111111' }, name: { fontSize: 14, color: '#555555', marginTop: 3 }, variant: { fontSize: 12, color: '#777777', marginTop: 8 }, price: { fontSize: 17, fontWeight: '900', color: '#111111', marginTop: 7 }, quantityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 }, quantityLabel: { fontSize: 12, marginRight: 8, color: '#555555' }, quantityButton: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' }, quantityButtonText: { fontSize: 18, color: '#111111' }, quantity: { minWidth: 28, textAlign: 'center', fontWeight: '800' }, linkRow: { flexDirection: 'row', gap: 18, marginTop: 13 }, link: { color: '#FF3F6C', fontSize: 11, fontWeight: '900' }, primaryAction: { alignSelf: 'flex-start', backgroundColor: '#FF3F6C', borderRadius: 6, marginTop: 12, paddingHorizontal: 12, paddingVertical: 8 }, primaryActionText: { color: '#FFFFFF', fontWeight: '900', fontSize: 11 }, totalCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 18, marginTop: 6 }, totalLabel: { fontSize: 13, fontWeight: '900', color: '#555555', marginBottom: 15 }, totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }, totalText: { fontSize: 14, color: '#333333' }, free: { color: '#03A685', fontWeight: '800' }, divider: { height: 1, backgroundColor: '#E6E6E6', marginBottom: 14 }, grandTotal: { fontSize: 16, fontWeight: '900', color: '#111111' }, placeOrder: { backgroundColor: '#FF3F6C', marginTop: 14, borderRadius: 8, paddingVertical: 17, alignItems: 'center' }, placeOrderText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' }, savedSection: { marginTop: 25 }, savedTitle: { fontSize: 13, fontWeight: '900', color: '#555555', marginBottom: 10 }, empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 35, backgroundColor: '#FFFFFF', margin: 14, borderRadius: 12 }, emptyIcon: { fontSize: 45, marginBottom: 16 }, emptyTitle: { fontSize: 21, fontWeight: '900', color: '#111111' }, emptyText: { color: '#666666', textAlign: 'center', marginTop: 8, fontSize: 14 }, shopButton: { marginTop: 24, backgroundColor: '#FF3F6C', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 20 }, shopButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 13 },
});
