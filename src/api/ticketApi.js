// import {IP} from '@env';
// const IP = 'http://192.168.1.5:3306';
const IP = 'http://10.0.2.2:3306';

import axios from 'axios';

//thêm vé
export const addTicketApi = async data => {
  try {
    const response = await axios.post(`${IP}/ticket`, data);

    return true;
  } catch (err) {
    throw new Error('Lỗi thêm tiket :' + err);
  }
};

//lấy danh sách vé cho khách hàng
export const getAllTicketByUserId = async user_id => {
  try {
    const response = await axios.get(`${IP}/ticket/user/${user_id}`);
    return response.data;
  } catch (err) {
    throw new Error('Lỗi lấy thông tin ticket :' + err);
  }
};

//lấy danh sách vé cho route trong ngày
export const getAllTicketByRouteInDay = async (route_id, date) => {
  try {
    const response = await axios.get(
      `${IP}/ticket/route_in_day/${route_id}/${date}`,
    );
    return response.data;
  } catch (err) {
    throw new Error('Lỗi lấy thông tin ticket :' + err);
  }
};

//lấy tất cả vé trong 1 ngày
export const getAllTicketByDay = async date => {
  try {
    const response = await axios.get(`${IP}/ticket/day/${date}`);
    return response.data;
  } catch (err) {
    throw new Error('Lỗi lấy thông tin ticket trong 1 ngày:' + err);
  }
};

//lấy tất cả vé trong 1 tháng
export const getAllTicketByMonth = async date => {
  try {
    const response = await axios.get(`${IP}/ticket/month/${date}`);
    return response.data;
  } catch (err) {
    throw new Error('Lỗi lấy thông tin ticket trong 1 ngày:' + err);
  }
};

//lấy tất cả vé trong 6 tháng gần nhất
export const getAllTicketBySixMonth = async date => {
  try {
    const response = await axios.get(`${IP}/ticket/6_month/${date}`);
    return response.data;
  } catch (err) {
    throw new Error('Lỗi lấy thông tin ticket trong 1 ngày:' + err);
  }
};
