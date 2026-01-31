import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, data: string) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (e) {
    console.log(e)
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value
  } catch (e) {
    console.log(e)
    return null
  }
};
