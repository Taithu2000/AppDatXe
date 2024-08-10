import {GET_ROUTES_DATA, ADD_ROUTE_DATA} from '../actions/routeAction';

const initialState = {
  routes: [],
  route: {
    start_date: '',
    end_date: '',
    bus_id: '',
    start_point: '',
    end_point: '',
    departure_time: '',
    total_time: '',
    date_interval: 0,
    _id: '',
  },
};

const routeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROUTES_DATA:
      return {
        ...state,
        routes: action.payload,
      };

    case ADD_ROUTE_DATA:
      return {
        ...state,
        routes: [...state.routes, action.payload],
        route: action.payload,
      };

    default:
      return state;
  }
};

export default routeReducer;
