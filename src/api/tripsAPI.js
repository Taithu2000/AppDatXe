// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

import axios from 'axios';

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
