export const SELECT_BUS = 'SELECT_BUS';
export const UPDATE_BUS = 'UPDATE_BUS';
export const DELETE_BUS = 'DELETE_BUS';
export const GET_BUSES_DATA = 'GET_BUSES_DATA';
export const ADD_BUS = 'ADD_BUS';

import axios from 'axios';

// import {IP} from '@env';
const IP = 'http://192.168.1.5:3306';
// const IP = 'http://10.0.2.2:3306';

//Lấy thông tin của tất cả xe

export const getAllbusData = () => async dispatch => {
  try {
    const response = await axios.get(`${IP}/bus`);
    dispatch({
      type: GET_BUSES_DATA,
      payload: response.data,
    });
    return true;
  } catch (e) {
    throw new Error('Không thể gọi data', e);
  }
};

//Lấy thông tin của 1 xe

export const selectBus = busData => dispatch => {
  dispatch({
    type: SELECT_BUS,
    payload: busData,
  });
};

// thêm xe

export const addBusAction = busData => async dispatch => {
  try {
    const response = await axios.post(`${IP}/bus`, busData);
    dispatch({
      type: ADD_BUS,
      payload: response.data,
    });
    return true;
  } catch (e) {
    throw new Error('Không thể thêm xe mới', e);
  }
};

//Cập nhật thông tin xe
export const updateBus = (_id, busData) => async dispatch => {
  try {
    const response = await axios.put(`${IP}/bus/update/${_id}`, busData);
    dispatch({
      type: UPDATE_BUS,
      payload: response.data,
    });
    return true;
  } catch (e) {
    throw new Error('Không thể gọi data', e);
  }
};

//Xóa thông tin xe
export const deleteBus = _id => async dispatch => {
  try {
    await axios.delete(`${IP}/bus/delete/${_id}`);
    dispatch({
      type: DELETE_BUS,
      payload: _id,
    });
    return true;
  } catch (e) {
    throw new Error('Không thể gọi data', e);
  }
};
