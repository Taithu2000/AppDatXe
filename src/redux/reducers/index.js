import {combineReducers} from 'redux';
import user from './userReducer';
import bus from './busReducer';

const reducers = combineReducers({
  user: user,
  bus: bus,
});

export default reducers;
// export default (state, action) => reducers(state, action);
