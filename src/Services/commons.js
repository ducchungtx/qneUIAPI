import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * Láy dữ liệu từ Localstorage
 *
 * @param {*} key
 * @returns
 */
export const getData = key => {
  try {
    return AsyncStorage.getItem(key) || '';
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Lưu dữ liệu vào Storage
 *
 * @param {*} key
 * @param {*} value
 */
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error.message);
  }
}
/**
 * Xóa dữ liệu Storage
 *
 * @param {*} key
 */
export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Hiển thị thông báo
 *
 * @param {*} message
 */
export const ToastMessage = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

/**
 * Xử lý phân trang theo mảng dữ liệu
 *
 * @param {*} array
 * @param {*} page_size
 * @param {*} page_number
 * @returns mảng dữ liệu
 */
export const paginate = (array, page_size, page_number) => {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}
