import { useState } from 'react';
import { FlatList, View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { useTips } from '../../../context/TipsContext';
import { useFavorites } from '../../../context/FavoritesContext';
import { sendLocalNotification } from '../../../utils/notifications';
import TipImage from '../../../components/TipImage';

const CATEGORIES = ['All', 'SAP', 'Software', 'Hardware', 'Networking'];
const categoryColor = {
  SAP: '#7C3AED',
  Software: '#2563EB',
  Hardware: '#059669',
  Networking: '#EA580C',
};

export default function TipsListScreen() {
  const router = useRouter();
  const { tips } = useTips();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [filterVisible, setFilterVisible] = useState(false);
  const [category, setCategory] = useState('All');

  const data = category === 'All' ? tips : tips.filter((t) => t.category === category);

  const onBookmark = (item) => {
    const saving = !isFavorite(item.id);
    toggleFavorite(item.id);
    if (saving) {
      sendLocalNotification('Tip bookmarked!', item.title);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.count}>
          {data.length} {data.length === 1 ? 'entry' : 'entries'}
          {category !== 'All' ? ' · ' + category : ''}
        </Text>
        <Pressable style={styles.filterBtn} onPress={() => setFilterVisible(true)}>
          <Text style={styles.filterText}>{category === 'All' ? 'Filter' : category} ▾</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable onPress={() => router.push(`/tips/${item.id}`)}>
              <TipImage category={item.category} style={styles.image} />
              <View style={styles.cardBody}>
                <View style={[styles.badge, { backgroundColor: categoryColor[item.category] || '#2563EB' }]}>
                  <Text style={styles.badgeText}>{item.category}</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.summary} numberOfLines={2}>{item.summary}</Text>
                <Text style={styles.meta}>{item.author} · {item.dateAdded}</Text>
              </View>
            </Pressable>

            <Pressable
              style={[styles.saveBtn, isFavorite(item.id) && styles.saveBtnActive]}
              onPress={() => onBookmark(item)}
            >
              <Text style={[styles.saveText, isFavorite(item.id) && styles.saveTextActive]}>
                {isFavorite(item.id) ? '★ Saved' : '☆ Save'}
              </Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No entries in this category.</Text>}
      />

      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setFilterVisible(false)}>
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Filter by category</Text>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[styles.option, category === cat && styles.optionActive]}
                onPress={() => {
                  setCategory(cat);
                  setFilterVisible(false);
                }}
              >
                <Text style={[styles.optionText, category === cat && styles.optionTextActive]}>{cat}</Text>
                {category === cat && <Text style={styles.check}>✓</Text>}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  count: { fontSize: 14, color: '#64748B', fontWeight: '600' },
  filterBtn: { backgroundColor: '#DBEAFE', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  filterText: { color: '#2563EB', fontWeight: '700' },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  image: { width: '100%', height: 150, backgroundColor: '#E2E8F0' },
  cardBody: { padding: 14 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 8 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  summary: { fontSize: 14, color: '#64748B', lineHeight: 20 },
  meta: { fontSize: 12, color: '#94A3B8', marginTop: 10 },
  saveBtn: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveBtnActive: { backgroundColor: '#EFF6FF' },
  saveText: { color: '#64748B', fontWeight: '700' },
  saveTextActive: { color: '#2563EB' },
  empty: { textAlign: 'center', color: '#94A3B8', marginTop: 48, fontSize: 15 },
  backdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 32 },
  sheetHandle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: '#E2E8F0', marginBottom: 14 },
  sheetTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginBottom: 4,
  },
  optionActive: { backgroundColor: '#DBEAFE' },
  optionText: { fontSize: 16, color: '#334155' },
  optionTextActive: { color: '#2563EB', fontWeight: '700' },
  check: { color: '#2563EB', fontSize: 18, fontWeight: '800' },
});
