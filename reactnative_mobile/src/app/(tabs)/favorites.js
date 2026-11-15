import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { useTips } from '../../context/TipsContext';
import { useFavorites } from '../../context/FavoritesContext';

export default function FavoritesScreen() {
  const router = useRouter();
  const { tips } = useTips();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const saved = tips.filter((t) => favoriteIds.includes(t.id));

  return (
    <View style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable style={styles.cardMain} onPress={() => router.push(`/tips/${item.id}`)}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </Pressable>
            <Pressable style={styles.removeBtn} onPress={() => toggleFavorite(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyIcon}>☆</Text>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>Tap Save on any entry to keep it here.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  list: { padding: 16, flexGrow: 1 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardMain: { flex: 1, paddingRight: 10 },
  category: { fontSize: 12, color: '#2563EB', fontWeight: '700', marginBottom: 2 },
  title: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  removeBtn: { backgroundColor: '#FEE2E2', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  removeText: { color: '#DC2626', fontWeight: '700', fontSize: 13 },
  emptyWrap: { alignItems: 'center', marginTop: 80, paddingHorizontal: 24 },
  emptyIcon: { fontSize: 56, color: '#CBD5E1' },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginTop: 12 },
  emptyText: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 6 },
});
