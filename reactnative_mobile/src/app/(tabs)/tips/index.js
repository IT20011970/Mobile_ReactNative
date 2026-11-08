import { useMemo, useState } from 'react';
import { FlatList, View, Text, Image, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';

import { tips } from '../../../data/tips';

export default function TipsListScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('All');
  const [filterVisible, setFilterVisible] = useState(false);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(tips.map((t) => t.category)))],
    []
  );

  const data = filter === 'All' ? tips : tips.filter((t) => t.category === filter);

  return (
    <View>
      <Pressable onPress={() => setFilterVisible(true)}>
        <Text>{filter === 'All' ? 'Filter by category' : filter} ▾</Text>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/tips/${item.id}`)}>
            <Image source={{ uri: item.image }} />
            <View>
              <Text>{item.category}</Text>
              <Text>{item.title}</Text>
              <Text>{item.summary}</Text>
              <Text>
                {item.author} · {item.dateAdded}
              </Text>
            </View>
          </Pressable>
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
            {categories.map((cat) => (
              <Pressable
                key={cat}
                onPress={() => {
                  setFilter(cat);
                  setFilterVisible(false);
                }}
              >
                <Text>
                  {cat}
                  {filter === cat ? '' : ''}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
