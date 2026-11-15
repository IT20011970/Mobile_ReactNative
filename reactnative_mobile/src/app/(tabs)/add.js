import { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { useTips } from '../../context/TipsContext';

const CATEGORIES = ['SAP', 'Software', 'Hardware', 'Networking'];

export default function AddScreen() {
  const router = useRouter();
  const { addTip } = useTips();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Hardware');
  const [summary, setSummary] = useState('');
  const [details, setDetails] = useState('');
  const [tags, setTags] = useState('');

  const onSave = () => {
    if (!title.trim()) return;

    const parsedTags = tags
      .split(/[,\s]+/)
      .map((t) => t.replace(/^#/, '').trim())
      .filter(Boolean);

    addTip({
      title: title.trim(),
      category,
      summary: summary.trim(),
      details: details.trim(),
      author: 'You',
      dateAdded: new Date().toISOString().slice(0, 10),
      tags: parsedTags,
      image: 'https://picsum.photos/seed/' + Date.now() + '/400/250',
    });
    setTitle('');
    setSummary('');
    setDetails('');
    setTags('');
    router.push('/tips');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Printer offline after update"
        placeholderTextColor="#94A3B8"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.chips}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            style={[styles.chip, category === c && styles.chipActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Summary</Text>
      <TextInput
        style={styles.input}
        placeholder="One-line summary"
        placeholderTextColor="#94A3B8"
        value={summary}
        onChangeText={setSummary}
      />

      <Text style={styles.label}>Tags</Text>
      <TextInput
        style={styles.input}
        placeholder="laptop, battery"
        placeholderTextColor="#94A3B8"
        value={tags}
        onChangeText={setTags}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Cause & Fix</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="What caused it and how to fix it"
        placeholderTextColor="#94A3B8"
        value={details}
        onChangeText={setDetails}
        multiline
      />

      <Pressable style={styles.saveBtn} onPress={onSave}>
        <Text style={styles.saveText}>Save entry</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 14, fontWeight: '700', color: '#334155', marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#0F172A',
  },
  textarea: { height: 110, textAlignVertical: 'top' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#fff',
  },
  chipActive: { backgroundColor: '#2563EB', borderColor: '#2563EB' },
  chipText: { color: '#475569', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  saveBtn: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 28,
  },
  saveText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
