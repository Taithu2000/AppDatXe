//////////////////////////////// dia chỉ ip
// import {IP} from '@env';
const IP = 'http://10.0.2.2:3306';
// const IP = 'http://192.168.1.5:3306';

export const GET_ROUTES_DATA = 'GET_ROUTES_DATA';
export const ADD_ROUTE_DATA = 'ADD_ROUTE_DATA';
export const SELECT_ROUTE = 'SELECT_ROUTE';
export const SELECT_ROUTE_BY_ID = 'SELECT_ROUTE_BY_ID';

export const UPDATE_ROUTE = 'UPDATE_ROUTE';
export const DELETE_ROUTE = 'DELETE_ROUTE';

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

//lấy 1 tuyến đường

export const selectRoute = routeData => dispatch => {
  try {
    dispatch({
      type: SELECT_ROUTE,
      payload: routeData,
    });
    return true;
  } catch (error) {
    throw new Error('Không có route', error);
  }
};

//lấy 1 tuyến đường qua ID

export const selectRouteById = _id => async dispatch => {
  try {
    const response = await axios.get(`${IP}/route/${_id}`);

    dispatch({
      type: SELECT_ROUTE_BY_ID,
      payload: response.data,
    });
    return true;
  } catch (error) {
    throw new Error('Không có route', error);
  }
};

// sửa tuyến đường

export const updateRouteData = (_id, dataRoute) => async dispatch => {
  try {
    const response = await axios.put(`${IP}/route/update/${_id}`, dataRoute);

    dispatch({
      type: UPDATE_ROUTE,
      payload: response.data,
    });

    return true;
  } catch (error) {
    throw new Error('Không thể gọi data sửa tuyến đường', error);
  }
};

// xoas tuyến đường

export const deleteRouteData = _id => async dispatch => {
  try {
    const response = await axios.delete(`${IP}/route/delete/${_id}`);

    dispatch({
      type: DELETE_ROUTE,
      payload: _id,
    });

    return true;
  } catch (error) {
    throw new Error('Không thể gọi data sửa tuyến đường', error);
  }
};
