// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

import axios from 'axios';

// lấy thông tin của các seat qua ngày
export const getSeatByDate = async date => {
  try {
    const response = await axios.get(`${IP}/seat_date/${date}`);
    return response.data;
  } catch (e) {
    throw new Error('Lỗi lấy dữ liệu: ', e);
  }
};

// lấy thông tin của seat qua route_id
export const getSeatAPI = async route_id => {
  try {
    const response = await axios.get(`${IP}/seat/${route_id}`);
    return response.data;
  } catch (e) {
    throw new Error('Lỗi lấy dữ liệu: ', e);
  }
};

// lấy thông tin của seat qua route_id và date
export const getSeatByRouteIdandDate = async (route_id, date) => {
  try {
    const response = await axios.get(`${IP}/seat/${route_id}/${date}`);
    return response.data;
  } catch (e) {
    throw new Error('Lỗi lấy dữ liệu: ', e);
  }
};

// xóax thông tin của seat qua route_id
export const deleteSeatByDates = async (route_id, date) => {
  try {
    const response = await axios.delete(
      `${IP}/seat/delete/${route_id}/${date}`,
    );
  } catch (e) {
    throw new Error('Lỗi xóa liệu: ', e);
  }
};

// Cập nhật lại ghế trống hoặc đã bán
export const updateSeatNumbers = async (_id, seatNumbers) => {
  try {
    const response = await axios.patch(`${IP}/seat/update/${_id}`, seatNumbers);
  } catch (e) {
    throw new Error('Lỗi cập nhật dữ liệu: ', e);
  }
};
