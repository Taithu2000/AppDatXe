// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

import axios from 'axios';

//Lấy danh sách  trip qua ngày , nơi đi - nơi đến

export const getTripByDate_Start_End = async (date, start_point, end_point) => {
  try {
    const response = await axios.get(
      `${IP}/trip/${date}/${start_point}/${end_point}`,
    );
    return response.data;
  } catch (e) {
    throw new Error('Lỗi lấy dữ liệu: ', e);
  }
};

//Lấy danh sách  trip qua ngày được truyền

export const getTripByDate = async date => {
  try {
    const response = await axios.get(`${IP}/trip/${date}`);
    return response.data;
  } catch (e) {
    throw new Error('Lỗi lấy dữ liệu: ', e);
  }
};

// lấy thông tin của trip qua route_id và ngày được truyền
export const getTripByRouteIdAndDate = async (route_id, date) => {
  try {
    const response = await axios.get(`${IP}/trip/${route_id}/${date}`);
    return response.data;
  } catch (e) {
    throw new Error('Lỗi lấy dữ liệu: ', e);
  }
};

//thêm trip

export const addTripByRouteId = async data => {
  try {
    const response = await axios.post(`${IP}/trip`, data);
    return true;
  } catch (e) {
    throw new Error('Lỗi thêm dữ liệu: ', e);
  }
};

//cập nhật trip

export const updateTripById = async (_id, data) => {
  try {
    const response = await axios.put(`${IP}/trip/update/${_id}`, data);
    return true;
  } catch (e) {
    throw new Error('Lỗi cập nhật dữ liệu: ', e);
  }
};

//cập nhật nhiều trip

export const updateManyTripByGroupId = async (groupId, date, data) => {
  try {
    const response = await axios.put(
      `${IP}/trip/update/all/${groupId}/${date}`,
      data,
    );
    return true;
  } catch (e) {
    throw new Error('Lỗi cập nhật dữ liệu: ', e);
  }
};

//xóa trip

export const deleteTripById = async _id => {
  try {
    const response = await axios.delete(`${IP}/trip/delete/${_id}`);
    return true;
  } catch (e) {
    throw new Error('Lỗi xóa dữ liệu: ', e);
  }
};

//xóa nhiều trip

export const deleteManyTripByGroupId = async (groupId, date) => {
  try {
    const response = await axios.delete(
      `${IP}/trip/delete/all/${groupId}/${date}`,
    );
    return true;
  } catch (e) {
    throw new Error('Lỗi xóa dữ liệu: ', e);
  }
};
