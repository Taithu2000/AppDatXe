import {combineReducers} from 'redux';
import user from './userReducer';
import bus from './busReducer';
import route from './routeReducer';
import location from './locationReducer';
import role from './authReducer';

const reducers = combineReducers({
  user: user,
  bus: bus,
  route: route,
  location: location,
  role: role,
});

export default reducers;
// export default (state, action) => reducers(state, action);
