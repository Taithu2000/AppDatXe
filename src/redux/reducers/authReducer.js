import {ROLES} from '../actions/authorization';

const initialState = {
  role: '',
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLES:
      return {
        ...state,
        role: action.payload,
      };

    default:
      return state;
  }
};

export default roleReducer;
