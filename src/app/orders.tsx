import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCart } from '@/context/CartContext';

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useCart();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.title}>MY ORDERS</Text>
        <View style={styles.headerSpace} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>📦</Text>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptyText}>
            Your completed orders will appear here.
          </Text>
          <Pressable
            style={styles.shopButton}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.shopButtonText}>START SHOPPING</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.createdAt).toDateString()}
                  </Text>
                </View>
                <Text style={styles.status}>{order.status}</Text>
              </View>

              <View style={styles.divider} />

              {order.items.map((item) => (
                <View
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  style={styles.productRow}
                >
                  <Text style={styles.productName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.productDetails}>
                    {item.quantity} × ₹{item.price}
                  </Text>
                </View>
              ))}

              <View style={styles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total paid</Text>
                <Text style={styles.total}>₹{order.total}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F7F7' },
  header: {
    height: 68,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { fontSize: 34, color: '#111111' },
  title: { fontSize: 17, fontWeight: '900', color: '#111111' },
  headerSpace: { width: 42 },
  content: { padding: 14, paddingBottom: 30 },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: { fontSize: 14, fontWeight: '900', color: '#111111' },
  orderDate: { marginTop: 4, fontSize: 12, color: '#777777' },
  status: {
    color: '#00885A',
    fontWeight: '800',
    fontSize: 12,
    backgroundColor: '#E7F8F1',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },
  divider: { height: 1, backgroundColor: '#EEEEEE', marginVertical: 14 },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 9,
    gap: 12,
  },
  productName: { flex: 1, fontSize: 14, color: '#222222' },
  productDetails: { fontSize: 13, fontWeight: '700', color: '#555555' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 15, fontWeight: '800', color: '#111111' },
  total: { fontSize: 16, fontWeight: '900', color: '#111111' },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 14,
    padding: 32,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  emptyIcon: { fontSize: 44, marginBottom: 14 },
  emptyTitle: { fontSize: 21, fontWeight: '900', color: '#111111' },
  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#777777',
    fontSize: 14,
  },
  shopButton: {
    marginTop: 24,
    backgroundColor: '#FF3F6C',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  shopButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
});