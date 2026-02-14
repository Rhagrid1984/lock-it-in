import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Button, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen() {
  const [phone, setPhone] = useState('');
  const [premium, setPremium] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const storedPhone = await SecureStore.getItemAsync('phone');
      const storedPremium = await SecureStore.getItemAsync('premium');
      const storedConsent = await SecureStore.getItemAsync('consent');

      if (storedPhone) setPhone(storedPhone);
      if (storedPremium) setPremium(storedPremium === 'true');
      if (storedConsent) setConsent(storedConsent === 'true');
    };

    loadData();
  }, []);

  const saveSettings = async () => {
    await SecureStore.setItemAsync('phone', phone);
    await SecureStore.setItemAsync('premium', premium.toString());
    await SecureStore.setItemAsync('consent', consent.toString());
    Alert.alert("Settings saved!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <Text style={styles.label}>Phone Number (login):</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="e.g. +447700900000"
        keyboardType="phone-pad"
      />

      <View style={styles.switchRow}>
        <Text>Premium Features</Text>
        <Switch value={premium} onValueChange={setPremium} />
      </View>

      <View style={styles.switchRow}>
        <Text>Consent to Data Usage</Text>
        <Switch value={consent} onValueChange={setConsent} />
      </View>

      <Button title="Save Settings" onPress={saveSettings} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  label: { fontWeight: '600', marginTop: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    borderRadius: 5, marginBottom: 15
  },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 15
  }
});
