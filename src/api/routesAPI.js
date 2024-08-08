// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

import axios from 'axios';

//-------------------------Lấy tất cả tuyến đường----------------------------------------------------------------

export const getAllrouteAPI = async () => {
  try {
    const response = await axios.get(`${IP}/route`);

    return response.data;
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};
