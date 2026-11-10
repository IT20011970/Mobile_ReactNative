import { ScrollView, View, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { useTips } from '../../../context/TipsContext';

export default function TipDetailScreen() {
  const { id } = useLocalSearchParams();
  const { tips } = useTips();
  const tip = tips.find((t) => t.id === id);

  if (!tip) {
    return (
      <View>
        <Text>Entry not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image source={{ uri: tip.image }} />
      <View>
        <Text>{tip.category}</Text>
        <Text>{tip.title}</Text>
        <Text>{tip.summary}</Text>

        <Text>Cause & Fix</Text>
        <Text>{tip.details}</Text>

        {tip.tags && (
          <View>
            {tip.tags.map((tag) => (
              <Text key={tag}>#{tag}</Text>
            ))}
          </View>
        )}

        <Text>
          Added by {tip.author} on {tip.dateAdded}
        </Text>
      </View>
    </ScrollView>
  );
}
