export const GET_USER = 'GET_USER';
export const GET_USER_DATA = 'GET_USERS_DATA';

export const USER_REGISTER = 'USER_REGISTER';
export const GET_USERS = 'GET_USERS';
export const UPDATE_USER = 'UPDATE_USER';

//${IP}:3306/
//////////////////////////////// dia chỉ ip
// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

import axios from 'axios';
import {Alert} from 'react-native';
import PhoneNumber from '../../screen/loginScreen/phoneNumber';

export const getOneUse = data => dispatch => {
  try {
    dispatch({type: GET_USER, payload: data});
  } catch (error) {
    throw new Error('Không có user', error);
  }
};

export const fetchUserData = _id => async dispatch => {
  try {
    const response = await axios.get(`${IP}/users/${_id}`);
    dispatch({type: GET_USER_DATA, payload: response.data});
    return null; // No error
  } catch (error) {
    Alert.alert('Error', 'Lỗi khi gửi yêu cầu API. Vui lòng thử lại sau.');
    throw new Error('Không thể gọi data', error);
  }
};

export const getUserByPhone = phoneNumber => async dispatch => {
  try {
    const response = await axios.get(`${IP}/users/phone/${phoneNumber}`);
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
    dispatch({type: USER_REGISTER, payload: response.data});

    return null;
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};

export const fetchUsersDataSSS = () => async dispatch => {
  try {
    const response = await axios.get(`${IP}/users`);
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });

    return null;
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};

export const updatedUserData = (_id, data) => async dispatch => {
  try {
    const response = await axios.PUT(`${IP}/users/update/${_id}`, data);
    dispatch({
      type: UPDATE_USER,
      payload: response.data,
    });

    return null; // No error
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};
