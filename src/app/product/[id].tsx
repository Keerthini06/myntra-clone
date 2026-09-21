import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { products } from '@/constants/product';
import { useCart } from '@/context/CartContext';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addRecentlyViewed } = useRecentlyViewed();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [bagMessage, setBagMessage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const product = products.find((item) => item.id === id);
  useEffect(() => {
  if (product) {
    addRecentlyViewed(product);
  }
}, [product]);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>GO BACK</Text>
        </Pressable>
      </View>
    );
  }
 const handleAddToBag = () => {
  if (!selectedSize || !selectedColor) {
    setBagMessage('Please select a size and color first.');
    return;
  }
  addToCart(product, selectedSize, selectedColor);
  setIsAdded(true);
  setBagMessage(
    `${product.name} added to bag — Size: ${selectedSize}, Color: ${selectedColor}`
  );
};

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.headerButton}
          onPress={() => router.back()}
        >
          <Text style={styles.headerIcon}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Product Details</Text>

        <View style={styles.headerActions}>
          <Pressable
            style={styles.headerButton}
            onPress={() => toggleWishlist(product)}
          >
            <Text style={styles.headerIcon}>
              {isWishlisted(product.id) ? '♥' : '♡'}
            </Text>
          </Pressable>
          <Pressable style={styles.headerButton} onPress={() => router.push('/cart' as never)}>
            <Text style={styles.headerIcon}>🛍️</Text>
          </Pressable>
        </View>
      </View>

      {/* PRODUCT IMAGE */}
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />

      {/* PRODUCT INFO */}
      <View style={styles.infoContainer}>
        <Text style={styles.brand}>{product.brand}</Text>

        <Text style={styles.productName}>
          {product.name}
        </Text>

        {/* RATING */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingBox}>
            <Text style={styles.ratingText}>
              ⭐ {product.rating}
            </Text>
          </View>

          <Text style={styles.ratingDivider}>|</Text>

          <Text style={styles.stockText}>
            {product.stock} items left
          </Text>
        </View>

        {/* PRICE */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{product.price}
          </Text>

          <Text style={styles.originalPrice}>
            ₹{product.originalPrice}
          </Text>

          <Text style={styles.discount}>
            {product.discount}% OFF
          </Text>
        </View>

        <Text style={styles.taxText}>
          Inclusive of all taxes
        </Text>

{/* SIZE */}
<Text style={styles.sectionTitle}>
  Select Size
</Text>

<View style={styles.optionsRow}>
  {product.sizes.map((size) => (
    <Pressable
      key={size}
      style={[
        styles.option,
        selectedSize === size && styles.selectedOption,
      ]}
      onPress={() => setSelectedSize(size)}
    >
      <Text
        style={[
          styles.optionText,
          selectedSize === size && styles.selectedOptionText,
        ]}
      >
        {size}
      </Text>
    </Pressable>
  ))}
</View>
        {/* COLORS */}
        <Text style={styles.sectionTitle}>
          Select Color
        </Text>

        <View style={styles.optionsRow}>
          {product.colors.map((color) => (
  <Pressable
    key={color}
    style={[
      styles.option,
      selectedColor === color && styles.selectedOption,
    ]}
    onPress={() => setSelectedColor(color)}
  >
    <Text
      style={[
        styles.optionText,
        selectedColor === color && styles.selectedOptionText,
      ]}
    >
      {color}
    </Text>
  </Pressable>
))}
        </View>

        {/* DELIVERY */}
        <View style={styles.deliveryBox}>
          <Text style={styles.deliveryTitle}>
            🚚 Delivery available
          </Text>

          <Text style={styles.deliveryText}>
            Check delivery options for your location
          </Text>
        </View>
        {bagMessage ? (
  <Text style={styles.bagMessage}>{bagMessage}</Text>
) : null}
        {/* ADD TO BAG */}
        <Pressable
         style={styles.addButton}
         onPress={handleAddToBag}>
          <Text style={styles.addButtonText}>
            {isAdded ? 'ADDED TO CART' : 'ADD TO BAG'}
         </Text>
        </Pressable>

        {/* BUY NOW */}
        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>
            BUY NOW
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerIcon: {
    fontSize: 28,
    color: '#111111',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },
  headerActions: { flexDirection: 'row', gap: 8 },

  productImage: {
    width: '100%',
    height: 470,
    backgroundColor: '#EEEEEE',
  },

  infoContainer: {
    padding: 22,
    paddingBottom: 50,
  },

  brand: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
  },

  productName: {
    fontSize: 17,
    color: '#555555',
    marginTop: 5,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
  },

  ratingBox: {
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },

  ratingText: {
    fontWeight: '700',
    color: '#222222',
  },

  ratingDivider: {
    color: '#AAAAAA',
  },

  stockText: {
    color: '#008000',
    fontWeight: '600',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
  },

  price: {
    fontSize: 25,
    fontWeight: '900',
    color: '#111111',
  },

  originalPrice: {
    fontSize: 16,
    color: '#888888',
    textDecorationLine: 'line-through',
  },

  discount: {
    fontSize: 15,
    fontWeight: '800',
    color: '#008000',
  },

  taxText: {
    fontSize: 13,
    color: '#777777',
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    marginTop: 28,
    marginBottom: 14,
  },

  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  option: {
    minWidth: 55,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    alignItems: 'center',
  },

  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
  },
  bagMessage: {
  marginTop: 20,
  color: '#008000',
  fontSize: 14,
  fontWeight: '700',
},
  selectedOption: {
  backgroundColor: '#111111',
  borderColor: '#111111',
},

selectedOptionText: {
  color: '#FFFFFF',
},

  deliveryBox: {
    marginTop: 30,
    padding: 18,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
  },

  deliveryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },

  deliveryText: {
    marginTop: 6,
    fontSize: 13,
    color: '#666666',
  },

  addButton: {
    marginTop: 25,
    backgroundColor: '#FF3F6C',
    paddingVertical: 17,
    borderRadius: 8,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  buyButton: {
    marginTop: 12,
    backgroundColor: '#111111',
    paddingVertical: 17,
    borderRadius: 8,
    alignItems: 'center',
  },

  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  errorText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  backButton: {
    backgroundColor: '#111111',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 8,
  },

  backButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
