import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("storage_saving_error", e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("storage_get_error", e);
  }
};

export const removeData = async (...args) => {
  try {
    for(let i=0;i<args.length;i++){
      await AsyncStorage.removeItem(args[i]);
    }
  } catch (e) {
    console.log("storage_remove_error", e);
  }
};
