import { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const categoryColor = {
  SAP: '#7C3AED',
  Software: '#2563EB',
  Hardware: '#059669',
  Networking: '#EA580C',
};

export default function TipImage({ category, style }) {
  const [failed, setFailed] = useState(false);

  const hex = (categoryColor[category] || '#64748B').replace('#', '');
  const label = encodeURIComponent(category || 'Entry');
  const uri = `https://placehold.co/600x300/${hex}/ffffff/png?text=${label}`;

  if (failed) {
    return (
      <View style={[style, styles.placeholder, { backgroundColor: '#' + hex }]}>
        <Text style={styles.placeholderText}>{category || 'Entry'}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      onError={() => setFailed(true)}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#fff', fontWeight: '800', fontSize: 18, opacity: 0.95 },
});
