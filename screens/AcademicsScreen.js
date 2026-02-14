import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AcademicsScreen() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    const stored = await AsyncStorage.getItem('academics');
    if (stored) setRecords(JSON.parse(stored));
  };

  const saveLock = async () => {
    if (!question || !answer) {
      Alert.alert("Both fields are required.");
      return;
    }

    const newLock = {
      id: Date.now().toString(),
      question,
      answer,
      createdAt: new Date().toISOString()
    };

    const updated = [...records, newLock];
    await AsyncStorage.setItem('academics', JSON.stringify(updated));
    setRecords(updated);
    setQuestion('');
    setAnswer('');
    Alert.alert("Answer locked in!");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.question}>Q: {item.question}</Text>
      <Text style={styles.answer}>Locked Answer: {item.answer}</Text>
      <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Academic Lock-In</Text>

      <TextInput
        placeholder="Enter a question"
        style={styles.input}
        value={question}
        onChangeText={setQuestion}
      />

      <TextInput
        placeholder="Enter your answer"
        style={styles.input}
        value={answer}
        onChangeText={setAnswer}
      />

      <Button title="Lock Answer 🔐" onPress={saveLock} />

      <FlatList
        data={records}
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
    backgroundColor: '#f5f5f5', padding: 15,
    borderRadius: 10, marginBottom: 10
  },
  question: { fontWeight: 'bold' },
  answer: { fontStyle: 'italic', marginTop: 5 },
  timestamp: { fontSize: 12, color: '#666', marginTop: 5 }
});
