import { useState } from 'react';
import { FlatList, View, Text, Image, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';

import { useTips } from '../../../context/TipsContext';
import { useFavorites } from '../../../context/FavoritesContext';

const CATEGORIES = ['All', 'SAP', 'Software', 'Hardware', 'Networking'];

export default function TipsListScreen() {
  const router = useRouter();
  const { tips } = useTips();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [filterVisible, setFilterVisible] = useState(false);
  const [category, setCategory] = useState('All');

  const data =
    category === 'All' ? tips : tips.filter((t) => t.category === category);

  return (
    <View>
      <Pressable onPress={() => setFilterVisible(true)}>
        <Text>{category === 'All' ? 'Filter by category' : category} ▾</Text>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={() => router.push(`/tips/${item.id}`)}>
              <Image source={{ uri: item.image }} />
              <Text>{item.category}</Text>
              <Text>{item.title}</Text>
              <Text>{item.summary}</Text>
              <Text>
                {item.author} · {item.dateAdded}
              </Text>
            </Pressable>

            {/* Bookmark button */}
            <Pressable onPress={() => toggleFavorite(item.id)}>
              <Text>{isFavorite(item.id) ? '★ Saved' : '☆ Save'}</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No entries in this category.</Text>}
      />

      {/* Filter Modal */}  
      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <Pressable onPress={() => setFilterVisible(false)}>
          <View>
            <Text>Filter by category</Text>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => {
                  setCategory(cat);
                  setFilterVisible(false);
                }}
              >
                <Text>
                  {cat}
                  {category === cat ? '' : ''}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
