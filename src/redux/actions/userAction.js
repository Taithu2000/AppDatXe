export const GET_USER_DATA = 'GET_USER_DATA';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
export const GET_USERS_DATA = 'GET_USERS_DATA';
//${IP}:3306/
//////////////////////////////// dia chỉ ip
// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

import axios from 'axios';
import {Alert} from 'react-native';

export const fetchUserData = phoneNumber => async dispatch => {
  try {
    const response = await axios.get(`${IP}/users/${phoneNumber}`);
    dispatch({type: GET_USER_DATA, payload: response.data});
    return null; // No error
  } catch (error) {
    Alert.alert('Error', 'Lỗi khi gửi yêu cầu API. Vui lòng thử lại sau.');
    throw new Error('Không thể gọi data', error);
  }
};

export const registerUser = userData => async dispatch => {
  try {
    const response = await axios.post(`${IP}/users`, userData);
    dispatch({type: USER_REGISTER_SUCCESS, payload: response.data});

    return null;
  } catch (error) {
    Alert.alert('Error', 'Lỗi khi đăng ký. Vui lòng thử lại sau.');
    dispatch({type: USER_REGISTER_FAIL, payload: error.message});
    throw new Error('Không thể gọi data', error);
  }
};

export const fetchUsersDataSSS = () => async dispatch => {
  try {
    const response = await axios.get(`${IP}/users`);
    dispatch({
      type: GET_USERS_DATA,
      payload: response.data,
    });

    return null; // No error
  } catch (error) {
    Alert.alert('Error', 'Lỗi khi gửi yêu cầu API. Vui lòng thử lại sau.');
    throw new Error('Không thể gọi data', error);
  }
};
