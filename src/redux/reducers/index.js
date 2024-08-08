import {combineReducers} from 'redux';
import user from './userReducer';
import bus from './busReducer';
import route from './routeReducer';

const reducers = combineReducers({
  user: user,
  bus: bus,
  route: route,
});

export default reducers;
// export default (state, action) => reducers(state, action);
