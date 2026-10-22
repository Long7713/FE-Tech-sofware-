import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  get: (key: string) => AsyncStorage.getItem(key).catch(() => null),
  set: (key: string, value: string) => AsyncStorage.setItem(key, value).catch(() => {}),
  remove: (key: string) => AsyncStorage.removeItem(key).catch(() => {}),
};
