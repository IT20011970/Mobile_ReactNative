import { useState } from 'react';
import { ScrollView, View, Text, TextInput, Pressable } from 'react-native';
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

  const onSave = () => {
    if (!title.trim()) return;
    addTip({
      title: title.trim(),
      category,
      summary: summary.trim(),
      details: details.trim(),
      author: 'You',
      dateAdded: new Date().toISOString().slice(0, 10),
      tags: [],
      image: 'https://picsum.photos/seed/' + Date.now() + '/400/250',
    });
    setTitle('');
    setSummary('');
    setDetails('');
    router.push('/tips');
  };

  return (
    <ScrollView>
      <Text>Add a knowledge entry</Text>

      <Text>Title</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />

      <Text>Category</Text>
      {CATEGORIES.map((c) => (
        <Pressable key={c} onPress={() => setCategory(c)}>
          <Text>
            {category === c ? '*' : '+'}
            {c}
          </Text>
        </Pressable>
      ))}

      <Text>Summary</Text>
      <TextInput
        placeholder="Short summary"
        value={summary}
        onChangeText={setSummary}
      />

      <Text>Cause & Fix</Text>
      <TextInput
        placeholder="What caused it and how to fix it"
        value={details}
        onChangeText={setDetails}
        multiline
      />

      <Pressable onPress={onSave}>
        <Text>Save entry</Text>
      </Pressable>
    </ScrollView>
  );
}
