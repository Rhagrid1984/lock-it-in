import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SharedScreen() {
  const [sharedLocks, setSharedLocks] = useState([]);

  useEffect(() => {
    const loadShared = async () => {
      try {
        const stored = await AsyncStorage.getItem('locks');
        const parsed = stored ? JSON.parse(stored) : [];
        const sharedOnly = parsed.filter(lock => lock.shared);
        setSharedLocks(sharedOnly);
      } catch (e) {
        Alert.alert("Error loading shared locks.");
      }
    };

    loadShared();
  }, []);

  const confirmSharedLock = async (id) => {
    const updated = sharedLocks.map(lock =>
      lock.id === id ? { ...lock, revealed: true } : lock
    );
    setSharedLocks(updated);
    await AsyncStorage.setItem('locks', JSON.stringify(updated));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>🔗 Shared Lock</Text>
      <Text>{item.content}</Text>
      <Text style={styles.timestamp}>Reveal Time: {new Date(item.reminderTime).toLocaleString()}</Text>
      {!item.revealed && (
        <Button title="Confirm Unlock 🔓" onPress={() => confirmSharedLock(item.id)} />
      )}
      {item.revealed && <Text style={styles.unlocked}>✅ Unlocked</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shared Locks</Text>
      <FlatList
        data={sharedLocks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#eef6ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  timestamp: { fontSize: 12, color: '#555', marginTop: 5 },
  unlocked: { marginTop: 8, fontWeight: 'bold', color: 'green' }
});
