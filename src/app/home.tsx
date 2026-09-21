import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  useWindowDimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { products } from '@/constants/product';
import { useCart } from '@/context/CartContext';
export default function HomeScreen() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { width } = useWindowDimensions();

  const isTablet = width >= 600;
  const isDesktop = width >= 1000;
  const [searchQuery, setSearchQuery] = useState('');
const [selectedCategory, setSelectedCategory] = useState('All');

const filteredProducts = useMemo(() => {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}, [searchQuery, selectedCategory]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          isDesktop && styles.desktopContainer,
        ]}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logo}>MYNTRA</Text>

          <View style={styles.headerIcons}>
            <Pressable onPress={() => router.push('/wishlist')}>
              <Text style={styles.icon}>♡</Text>
            </Pressable>

            <Pressable onPress={() => router.push('/cart')}>
            <Text style={styles.icon}>🛍️ {cartCount}</Text>
           </Pressable>
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>⌕</Text>

          <TextInput
            placeholder="Search for products, brands and more"
            placeholderTextColor="#777"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* CATEGORIES */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {['All', 'Men', 'Women', 'Kids', 'Beauty', 'Home'].map((category) => (
          <Pressable
          key={category}
          style={[
          styles.category,
          selectedCategory === category && styles.categorySelected,
          ]}
          onPress={() => setSelectedCategory(category)}>
         <Text
         style={[
          styles.categoryText,
          selectedCategory === category && styles.categoryTextSelected,
        ]}>
      {category}
    </Text>
    </Pressable>
))}
        </ScrollView>

        {/* SALE BANNER */}
        <View style={styles.saleBanner}>
          <Text style={styles.saleSmall}>BIG FASHION SALE</Text>

          <Text style={styles.saleTitle}>UP TO 70% OFF</Text>

          <Text style={styles.saleSubtitle}>
            Fashion for every moment
          </Text>

          <Pressable style={styles.shopButton}>
            <Text style={styles.shopButtonText}>SHOP NOW</Text>
          </Pressable>
        </View>

        {/* TRENDING */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Now</Text>

          <Pressable>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        {/* PRODUCT CARDS */}
        <View style={[
          styles.products,
          isTablet && styles.tabletProducts,
          isDesktop && styles.desktopProducts,
        ]}>
          {filteredProducts.length === 0 ? (
  <View style={styles.emptyResults}>
    <Text style={styles.emptyResultsTitle}>No products found</Text>
    <Text style={styles.emptyResultsText}>
      Try another search or category.
    </Text>
  </View>
) : (
  filteredProducts.map((product) => (
  <Pressable
  key={product.id}
  style={[
    styles.productCard,
    isTablet && styles.tabletCard,
    isDesktop && styles.desktopCard,
  ]}
  onPress={() =>
  router.push({
    pathname: '/product/[id]',
    params: { id: product.id },
  })
}
>
    <Image
  source={{ uri: product.image }}
  style={styles.productImage}
  resizeMode="cover"
/>

    <Text style={styles.productName}>
      {product.name}
    </Text>

    <Text style={styles.productPrice}>
      ₹{product.price}
    </Text>

    <Text style={styles.productDiscount}>
      {product.discount}% OFF
    </Text>

    <Text style={styles.productRating}>
      ⭐ {product.rating}
    </Text>
  </Pressable>
))
)}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    paddingHorizontal: 28,
    paddingBottom: 40,
  },

  desktopContainer: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },

  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 20,
  },

  logo: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#111111',
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  icon: {
    fontSize: 28,
    color: '#111111',
  },

  /* SEARCH */

  searchBar: {
    height: 55,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  searchIcon: {
    fontSize: 30,
    marginRight: 8,
    color: '#111111',
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111111',
  },

  /* CATEGORIES */

  categoryContainer: {
    gap: 14,
    paddingBottom: 20,
  },

  category: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 30,
  },

  categoryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
  },
  categorySelected: {
  backgroundColor: '#111111',
},
categoryTextSelected: {
  color: '#FFFFFF',
},

  /* SALE */

  saleBanner: {
    backgroundColor: '#F5E5D3',
    borderRadius: 20,
    padding: 35,
    marginBottom: 35,
  },

  saleSmall: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#111111',
    marginBottom: 12,
  },

  saleTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111111',
    marginBottom: 10,
  },

  saleSubtitle: {
    fontSize: 18,
    color: '#222222',
    marginBottom: 25,
  },

  shopButton: {
    backgroundColor: '#111111',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },

  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  /* TRENDING */

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111111',
  },

  viewAll: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },

  /* PRODUCTS */

  products: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },

  tabletProducts: {
    gap: 20,
  },

  desktopProducts: {
    gap: 25,
  },

  productCard: {
    width: '47%',
  },

  tabletCard: {
    width: '30%',
  },

  desktopCard: {
    width: '22%',
  },

  productImage: {
    height: 220,
    backgroundColor: '#EEEEEE',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  imageText: {
    color: '#999999',
    fontSize: 15,
  },

  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222222',
  },

  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 5,
    color: '#111111',
  },
  productDiscount: {
  fontSize: 13,
  fontWeight: '700',
  marginTop: 4,
  color: '#008000',
},

productRating: {
  fontSize: 13,
  marginTop: 4,
  color: '#555555',
},
emptyResults: {
  width: '100%',
  paddingVertical: 35,
  alignItems: 'center',
},
emptyResultsTitle: {
  fontSize: 17,
  fontWeight: '800',
  color: '#222222',
},
emptyResultsText: {
  marginTop: 6,
  fontSize: 14,
  color: '#777777',
},
});
