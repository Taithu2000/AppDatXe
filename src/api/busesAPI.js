// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

//-------------------------Lấy tất cả xe----------------------------------------------------------------

import axios from 'axios';

export const getAllbusAPI = async () => {
  try {
    const response = await axios.get(`${IP}/bus`);

    return response.data;
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};

//-------------------------Thêm xe----------------------------------------------------------------

export const addBusAPI = async data => {
  try {
    await axios.post(`${IP}/bus`, data);
    return true;
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};
