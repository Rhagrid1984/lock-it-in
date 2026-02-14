import * as SecureStore from 'expo-secure-store';

export const saveSecureItem = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    console.error('SecureStore save error:', e);
  }
};

export const getSecureItem = async (key) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    return result;
  } catch (e) {
    console.error('SecureStore load error:', e);
    return null;
  }
};
