import {SELECT_BUS, UPDATE_BUS, DELETE_BUS} from '../actions/busAction';

const initialState = {
  bus: {
    license_plate: '',
    type: '',
    registration_date: '',
    brand: '',
    color: '',
    num_Seats: '',
    image: '',
  },
};

const BusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_BUS:
      return {
        ...state,
        bus: action.payload,
      };

    case UPDATE_BUS:
      return {
        ...state,
        bus: action.payload,
      };

    case DELETE_BUS:
      return {
        ...state,
        bus: {
          license_plate: '',
          type: '',
          registration_date: '',
          brand: '',
          color: '',
          num_Seats: '',
          image: '',
        },
      };

    default:
      return state;
  }
};

export default BusReducer;
