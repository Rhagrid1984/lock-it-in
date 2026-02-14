import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

export default function SponsoredScreen() {
  const [sponsor, setSponsor] = useState('');
  const [prompt, setPrompt] = useState('');
  const [sponsoredLocks, setSponsoredLocks] = useState([]);

  const addSponsored = () => {
    if (!sponsor || !prompt) {
      Alert.alert("Please enter sponsor and prompt.");
      return;
    }

    const newLock = {
      id: Date.now().toString(),
      sponsor,
      prompt,
      createdAt: new Date().toISOString()
    };

    setSponsoredLocks([...sponsoredLocks, newLock]);
    setSponsor('');
    setPrompt('');
    Alert.alert("Sponsored lock created!");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.sponsor}>🛍 Sponsor: {item.sponsor}</Text>
      <Text style={styles.prompt}>“{item.prompt}”</Text>
      <Text style={styles.timestamp}>Posted: {new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sponsored Locks</Text>

      <TextInput
        placeholder="Brand / Sponsor"
        style={styles.input}
        value={sponsor}
        onChangeText={setSponsor}
      />

      <TextInput
        placeholder="What's the challenge or prediction?"
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
      />

      <Button title="Add Sponsored Lock 🔐" onPress={addSponsored} />

      <FlatList
        data={sponsoredLocks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: '#ccc',
    padding: 10, borderRadius: 5, marginBottom: 10
  },
  card: {
    backgroundColor: '#fff5ea', padding: 15,
    borderRadius: 10, marginBottom: 10, borderColor: '#ffd699', borderWidth: 1
  },
  sponsor: { fontWeight: 'bold', color: '#c47f00' },
  prompt: { marginTop: 5 },
  timestamp: { fontSize: 12, color: '#666', marginTop: 5 }
});
