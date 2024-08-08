//////////////////////////////// dia chỉ ip
// import {IP} from '@env';
const IP = 'http://10.0.2.2:3306';

export const GET_ROUTES_DATA = 'GET_ROUTES_DATA';

import axios from 'axios';

export const getAllrouteData = () => async dispatch => {
  try {

    const response = await axios.get(`${IP}/route`);
    console.log('OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOK');

    dispatch({
      type: GET_ROUTES_DATA,
      payload: response.data,
    });

    console.log('OKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOKOK');
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};
