import {
  GET_ROUTES_DATA,
  ADD_ROUTE_DATA,
  SELECT_ROUTE,
  UPDATE_ROUTE,
  DELETE_ROUTE,
  SELECT_ROUTE_BY_ID,
  LOGOUT,
} from '../actions/routeAction';

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

    case SELECT_ROUTE:
      return {
        ...state,
        route: action.payload,
      };

    case SELECT_ROUTE_BY_ID:
      return {
        ...state,
        route: action.payload,
      };

    case UPDATE_ROUTE:
      const updateRoute = state.routes.map(route => {
        if (route._id === action.payload._id) {
          return action.payload;
        } else {
          return route;
        }
      });

      return {
        ...state,
        routes: updateRoute,
        route: action.payload,
      };
    case DELETE_ROUTE:
      const deleteRoute = state.routes.filter(route => {
        return route._id !== action.payload;
      });

      return {
        ...state,
        routes: deleteRoute,
        route: initialState.route,
      };

    case LOGOUT:
      return {
        ...state,
        route: initialState.route,
      };

    default:
      return state;
  }
};

export default routeReducer;
