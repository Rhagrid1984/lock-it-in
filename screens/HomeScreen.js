import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function HomeScreen() {
  const [text, setText] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleLockIn = async () => {
    if (!text) return Alert.alert("Enter something to lock in.");

    const lockItem = {
      id: Date.now().toString(),
      content: text,
      shared: isShared,
      reminderTime: reminderTime.toISOString(),
      createdAt: new Date().toISOString(),
      revealed: false
    };

    try {
      const existing = await AsyncStorage.getItem('locks');
      const locks = existing ? JSON.parse(existing) : [];
      locks.push(lockItem);
      await AsyncStorage.setItem('locks', JSON.stringify(locks));
      setText('');
      Alert.alert("Locked in successfully!");
    } catch (e) {
      Alert.alert("Error saving lock.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Lock In a Thought</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your prediction, thought, or answer..."
        value={text}
        onChangeText={setText}
      />

      <View style={styles.row}>
        <Text>Shared Lock:</Text>
        <Switch value={isShared} onValueChange={setIsShared} />
      </View>

      <View style={styles.row}>
        <Button title="Set Reveal Time" onPress={() => setShowDatePicker(true)} />
        <Text>{reminderTime.toLocaleTimeString()}</Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowDatePicker(false);
            if (selectedTime) setReminderTime(selectedTime);
          }}
        />
      )}

      <Button title="Lock It In 🔐" onPress={handleLockIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15
  }
});
