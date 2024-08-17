import {combineReducers} from 'redux';
import user from './userReducer';
import bus from './busReducer';
import route from './routeReducer';
import location from './locationReducer';

const reducers = combineReducers({
  user: user,
  bus: bus,
  route: route,
  location: location,
});

export default reducers;
// export default (state, action) => reducers(state, action);
