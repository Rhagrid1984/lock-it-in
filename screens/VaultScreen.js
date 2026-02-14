import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VaultScreen() {
  const [locks, setLocks] = useState([]);

  const loadLocks = async () => {
    try {
      const stored = await AsyncStorage.getItem('locks');
      const parsed = stored ? JSON.parse(stored) : [];
      setLocks(parsed);
    } catch (e) {
      console.error('Failed to load locks:', e);
    }
  };

  const revealAll = () => {
    const updated = locks.map(lock => ({
      ...lock,
      revealed: true,
    }));
    setLocks(updated);
    AsyncStorage.setItem('locks', JSON.stringify(updated));
  };

  useEffect(() => {
    loadLocks();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>🔒 {item.revealed ? 'Unlocked' : 'Locked'}</Text>
      <Text>{item.content}</Text>
      <Text style={styles.timestamp}>Scheduled: {new Date(item.reminderTime).toLocaleString()}</Text>
      <Text style={styles.timestamp}>Created: {new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Vault</Text>
      <Button title="Reveal All 🔓" onPress={revealAll} />
      <FlatList
        data={locks}
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
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2
  },
  title: { fontWeight: 'bold', fontSize: 16 },
  timestamp: { fontSize: 12, color: '#666', marginTop: 5 }
});
