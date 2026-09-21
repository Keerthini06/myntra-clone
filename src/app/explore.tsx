import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

const categories = [
  {
    title: 'Men',
    image:
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Women',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Kids',
    image:
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80',
  },
];

const collections = [
  {
    title: 'Western Wear',
    subtitle: 'Trending styles',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Footwear',
    subtitle: 'Step into style',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Accessories',
    subtitle: 'Complete your look',
    image:
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
  },
];

export default function TabTwoScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText type="title" style={styles.heading}>
        Explore
      </ThemedText>

      <ThemedText style={styles.subheading} themeColor="textSecondary">
        Discover styles made for you
      </ThemedText>

      {/* Search */}
      <Pressable
        style={[
          styles.searchBox,
          {
            backgroundColor: theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}
      >
        <ThemedText style={styles.searchIcon}>⌕</ThemedText>
        <ThemedText themeColor="textSecondary">
          Search categories, brands and more
        </ThemedText>
      </Pressable>

      {/* Categories */}
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle">Shop By Category</ThemedText>
        <ThemedText type="link">View All</ThemedText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      >
        {categories.map((category) => (
          <Pressable key={category.title} style={styles.categoryCard}>
            <Image
              source={{ uri: category.image }}
              style={styles.categoryImage}
              contentFit="cover"
            />

            <ThemedView style={styles.categoryLabel}>
              <ThemedText type="smallBold">{category.title}</ThemedText>
            </ThemedView>
          </Pressable>
        ))}
      </ScrollView>

      {/* Collections */}
      <View style={styles.sectionHeader}>
        <ThemedText type="subtitle">Shop By Collection</ThemedText>
      </View>

      {collections.map((collection) => (
        <Pressable key={collection.title} style={styles.collectionCard}>
          <Image
            source={{ uri: collection.image }}
            style={styles.collectionImage}
            contentFit="cover"
          />

          <View style={styles.collectionOverlay}>
            <ThemedText type="title" style={styles.collectionTitle}>
              {collection.title}
            </ThemedText>

            <ThemedText style={styles.collectionSubtitle}>
              {collection.subtitle}
            </ThemedText>

            <View style={styles.shopButton}>
              <ThemedText style={styles.shopButtonText}>
                SHOP NOW
              </ThemedText>
            </View>
          </View>
        </Pressable>
      ))}

      <ThemedText
        style={styles.bottomText}
        themeColor="textSecondary"
      >
        More styles coming soon ✨
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  heading: {
    fontSize: 34,
    fontWeight: '800',
  },

  subheading: {
    marginTop: 5,
    fontSize: 16,
    marginBottom: 22,
  },

  searchBox: {
    height: 54,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },

  searchIcon: {
    fontSize: 27,
    fontWeight: '600',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  horizontalList: {
    gap: 14,
    paddingBottom: 30,
  },

  categoryCard: {
    width: 125,
    borderRadius: 18,
    overflow: 'hidden',
  },

  categoryImage: {
    width: 125,
    height: 155,
    borderRadius: 18,
  },

  categoryLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  collectionCard: {
    height: 220,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 18,
    position: 'relative',
  },

  collectionImage: {
    width: '100%',
    height: '100%',
  },

  collectionOverlay: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },

  collectionTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },

  collectionSubtitle: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 3,
    marginBottom: 12,
  },

  shopButton: {
    backgroundColor: '#111111',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },

  shopButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12,
  },

  bottomText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
});