import * as SecureStore from 'expo-secure-store';

export const savePhoneNumber = async (phone) => {
  try {
    await SecureStore.setItemAsync('phone', phone);
  } catch (e) {
    console.error('Error saving phone number:', e);
  }
};

export const getPhoneNumber = async () => {
  try {
    const phone = await SecureStore.getItemAsync('phone');
    return phone;
  } catch (e) {
    console.error('Error retrieving phone number:', e);
    return null;
  }
};
