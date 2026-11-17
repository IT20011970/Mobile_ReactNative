import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useTips } from '../../../context/TipsContext';
import TipImage from '../../../components/TipImage';

const categoryColor = {
  SAP: '#7C3AED',
  Software: '#2563EB',
  Hardware: '#059669',
  Networking: '#EA580C',
};

export default function TipDetailScreen() {
  const { id } = useLocalSearchParams();
  const { tips } = useTips();
  const tip = tips.find((t) => t.id === id);

  if (!tip) {
    return (
      <View style={styles.center}>
        <Text style={styles.missing}>Entry not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <TipImage category={tip.category} style={styles.hero} />
      <View style={styles.body}>
        <View style={[styles.badge, { backgroundColor: categoryColor[tip.category] || '#2563EB' }]}>
          <Text style={styles.badgeText}>{tip.category}</Text>
        </View>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.summary}>{tip.summary}</Text>

        <Text style={styles.sectionTitle}>Cause & Fix</Text>
        <Text style={styles.details}>{tip.details}</Text>

        {tip.tags && tip.tags.length > 0 && (
          <View style={styles.tagRow}>
            {tip.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.meta}>Added by {tip.author} on {tip.dateAdded}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  missing: { fontSize: 16, color: '#64748B' },
  hero: { width: '100%', height: 220, backgroundColor: '#E2E8F0' },
  body: { padding: 20 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 8 },
  summary: { fontSize: 15, color: '#475569', lineHeight: 22 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginTop: 20, marginBottom: 6 },
  details: { fontSize: 15, color: '#334155', lineHeight: 24 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 18 },
  tag: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tagText: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  meta: { fontSize: 12, color: '#94A3B8', marginTop: 22 },
});
