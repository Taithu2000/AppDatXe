import {
  SELECT_BUS,
  UPDATE_BUS,
  DELETE_BUS,
  GET_BUSES_DATA,
  ADD_BUS,
} from '../actions/busAction';

const initialState = {
  buses: [],
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
    case GET_BUSES_DATA:
      return {
        ...state,
        buses: action.payload,
      };

    case SELECT_BUS:
      return {
        ...state,
        bus: action.payload,
      };

    case ADD_BUS:
      return {
        ...state,
        buses: [...state.buses, action.payload],
      };

    case UPDATE_BUS:
      const updatedBuses = state.buses.map(bus => {
        if (bus._id === action.payload._id) {
          return action.payload;
        } else {
          return bus;
        }
      });
      return {
        ...state,
        buses: updatedBuses,
        bus: action.payload,
      };

    case DELETE_BUS:
      return {
        ...state,
        buses: state.buses.filter(bus => bus._id !== state.bus._id),
        bus: initialState.bus,
      };

    default:
      return state;
  }
};

export default BusReducer;
