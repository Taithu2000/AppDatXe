//////////////////////////////// dia chỉ ip
// import {IP} from '@env';
// const IP = 'http://10.0.2.2:3306';
const IP = 'http://192.168.1.5:3306';

export const GET_ROUTES_DATA = 'GET_ROUTES_DATA';
export const ADD_ROUTE_DATA = 'ADD_ROUTE_DATA';

import axios from 'axios';

// lấy tất cả tuyến đường
export const getAllrouteData = () => async dispatch => {
  try {
    const response = await axios.get(`${IP}/route`);

    dispatch({
      type: GET_ROUTES_DATA,
      payload: response.data,
    });
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};

// thêm tuyến đường

export const addRouteData = dataRoute => async dispatch => {
  try {
    const response = await axios.post(`${IP}/route`, dataRoute);
    const {route} = response.data;
    dispatch({
      type: ADD_ROUTE_DATA,
      payload: route,
    });
    return true;
  } catch (error) {
    throw new Error('Không thể gọi data', error);
  }
};
