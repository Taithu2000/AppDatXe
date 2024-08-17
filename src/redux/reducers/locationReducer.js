import {
  SELECT_START_POINT,
  SELECT_END_POINT,
  SELECT_DATE,
} from '../actions/locationAction';
import dayjs from 'dayjs';

const initialState = {
  startLocation: 'Đắk Lắk',
  endLocation: 'Hồ Chí Minh',
  departure_date: dayjs(),
};

const LocationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_START_POINT:
      return {
        ...state,
        startLocation: action.payload,
      };

    case SELECT_END_POINT:
      return {
        ...state,
        endLocation: action.payload,
      };

    case SELECT_DATE:
      return {
        ...state,
        departure_date: action.payload,
      };
    default:
      return state;
  }
};

export default LocationReducer;
