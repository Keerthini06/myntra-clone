import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCart } from '@/context/CartContext';

export default function CheckoutScreen() {
  const router = useRouter();
  const { cartTotal, placeOrder } = useCart();
 
  const [finalAmount, setFinalAmount] = useState(0);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  function handlePlaceOrder() {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setMessage('Please fill in your name, phone number, and delivery address.');
      return;
    }

    if (phone.trim().length < 10) {
      setMessage('Please enter a valid phone number.');
      return;
    }
    const orderAmount = cartTotal;

placeOrder();

setFinalAmount(orderAmount);

setMessage('Order placed successfully! Your items will be delivered soon.');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.title}>CHECKOUT</Text>
        <View style={styles.headerSpace} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>DELIVERY DETAILS</Text>

          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="Delivery address"
            multiline
            textAlignVertical="top"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.card}>
  <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>

  {/* UPI */}
  <Pressable
    style={[
      styles.paymentOption,
      paymentMethod === 'UPI' && styles.selectedPayment,
    ]}
    onPress={() => setPaymentMethod('UPI')}
  >
    <Text style={styles.paymentIcon}>📱</Text>

    <View style={styles.paymentInfo}>
      <Text style={styles.paymentTitle}>UPI</Text>
      <Text style={styles.paymentText}>
        Pay using Google Pay, PhonePe or any UPI app
      </Text>
    </View>

    <Text style={styles.radio}>
      {paymentMethod === 'UPI' ? '●' : '○'}
    </Text>
  </Pressable>

  {/* Cash on Delivery */}
  <Pressable
    style={[
      styles.paymentOption,
      paymentMethod === 'COD' && styles.selectedPayment,
    ]}
    onPress={() => setPaymentMethod('COD')}
  >
    <Text style={styles.paymentIcon}>💵</Text>

    <View style={styles.paymentInfo}>
      <Text style={styles.paymentTitle}>Cash on Delivery</Text>
      <Text style={styles.paymentText}>
        Pay when your order arrives
      </Text>
    </View>

    <Text style={styles.radio}>
      {paymentMethod === 'COD' ? '●' : '○'}
    </Text>
  </Pressable>

  {/* Card */}
  <Pressable
    style={[
      styles.paymentOption,
      paymentMethod === 'CARD' && styles.selectedPayment,
    ]}
    onPress={() => setPaymentMethod('CARD')}
  >
    <Text style={styles.paymentIcon}>💳</Text>

    <View style={styles.paymentInfo}>
      <Text style={styles.paymentTitle}>Credit / Debit Card</Text>
      <Text style={styles.paymentText}>
        Pay securely using your card
      </Text>
    </View>

    <Text style={styles.radio}>
      {paymentMethod === 'CARD' ? '●' : '○'}
    </Text>
  </Pressable>
</View>

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
          <Text style={styles.total}>
          ₹{message ? finalAmount : cartTotal}
</Text>   
        </View>

        {message ? (
       <View>
       <Text style={styles.message}>{message}</Text>
       <Pressable
         style={styles.viewOrdersButton}
          onPress={() => router.replace('/orders')}>
      <Text style={styles.viewOrdersText}>VIEW MY ORDERS</Text>
    </Pressable>
  </View>
) : null}

        <Pressable style={styles.orderButton} onPress={handlePlaceOrder}>
          <Text style={styles.orderButtonText}>PLACE ORDER</Text>
        </Pressable>
      </ScrollView>
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
  content: { padding: 14, paddingBottom: 35 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#555555',
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111111',
    marginBottom: 11,
  },
  addressInput: { height: 95 },
  paymentRow: { flexDirection: 'row', alignItems: 'center' },
  paymentIcon: { fontSize: 28, marginRight: 12 },
  paymentTitle: { fontSize: 15, fontWeight: '800', color: '#111111' },
  paymentText: { marginTop: 3, fontSize: 12, color: '#777777' },
  totalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: { fontSize: 13, fontWeight: '900', color: '#555555' },
  total: { fontSize: 20, fontWeight: '900', color: '#111111' },
  message: {
    marginTop: 16,
    textAlign: 'center',
    color: '#00885A',
    fontWeight: '700',
  },
  orderButton: {
    backgroundColor: '#FF3F6C',
    borderRadius: 8,
    paddingVertical: 17,
    marginTop: 16,
    alignItems: 'center',
  },
  orderButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  viewOrdersButton: {
  alignSelf: 'center',
  marginTop: 12,
  paddingVertical: 10,
  paddingHorizontal: 14,
},
viewOrdersText: {
  color: '#FF3F6C',
  fontSize: 13,
  fontWeight: '900',
},
paymentOption: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#E1E1E1',
  borderRadius: 10,
  padding: 12,
  marginBottom: 10,
},

selectedPayment: {
  borderColor: '#FF3F6C',
  backgroundColor: '#FFF5F7',
},

paymentInfo: {
  flex: 1,
},

radio: {
  fontSize: 20,
  color: '#FF3F6C',
  marginLeft: 8,
},
});