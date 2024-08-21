import axios from 'axios';
import base64 from 'react-native-base64';

let baseUrl = 'https://api-m.sandbox.paypal.com';
let clientId =
  'AfpzqrXL6Oypuhe4-IqhciJVw3-V69aAYzOxtTONi2TmE4h7NQuDIY6GVe3KEeGDDJuyC2SC_wruOrpE';
let secretKey =
  'EAjnnab7P596uitrjp7UjXXit74NTDaK3JPGf4aCsPLQjwQhIY5p_9YMFtgCXR-DrQoUTVWzKflb8kOp';

const generateToken = () => {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append(
    'Authorization',
    'Basic ' + base64.encode(`${clientId}:${secretKey}`),
  );

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v1/oauth2/token', requestOptions)
      .then(response => response.text())
      .then(result => {
        const {access_token} = JSON.parse(result);
        resolve(access_token);
      })
      .catch(error => {
        console.log('error raised', error);
        reject(error);
      });
  });
};

const createOrder = (orderDetail, token = '') => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderDetail),
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v2/checkout/orders', requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch(error => {
        console.log('error raised', error);
        reject(error);
      });
  });
};

const capturePayment = (id, token = '') => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch(error => {
        console.log('error raised', error);
        reject(error);
      });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment,
};
