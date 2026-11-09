import { FlatList, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

import { tips } from '../../data/tips';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const saved = tips.filter((t) => favoriteIds.includes(t.id));

  return (
    <View>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={() => router.push(`/tips/${item.id}`)}>
              <Text>{item.category}</Text>
              <Text>{item.title}</Text>
            </Pressable>
            <Pressable onPress={() => toggleFavorite(item.id)}>
              <Text>Remove</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No favorites yet. Tap Save on an entry.</Text>}
      />
    </View>
  );
}
