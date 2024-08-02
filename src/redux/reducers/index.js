import {combineReducers} from 'redux';
import user from './userReducer';

const reducers = combineReducers({
  user: user,
});

export default reducers;
// export default (state, action) => reducers(state, action);
