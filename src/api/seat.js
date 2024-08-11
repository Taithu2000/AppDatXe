// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

import axios from 'axios';

// lấy thông tin của seat qua route_id
export const getSeatAPI = async route_id => {
  try {
    const response = await axios.get(`${IP}/seat/${route_id}`);
    return response.data;
  } catch (e) {
    throw new Error('Lỗi lấy dữ liệu: ', e);
  }
};

// lấy thông tin của seat qua route_id
export const deleteSeatByDates = async (route_id, date) => {
  try {
    const response = await axios.delete(`${IP}/seat/delete/${route_id}/${date}`);
  } catch (e) {
    throw new Error('Lỗi lấy dữ liệu: ', e);
  }
};
