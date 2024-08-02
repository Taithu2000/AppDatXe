import {
  GET_USER_DATA,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  GET_USERS_DATA,
} from '../actions/userAction';

const initialState = {
  users: [],
  user: {
    phoneNumber: '',
    name: '',
    password: '',
    email: '',
    roles: '',
    birthDate: '',
    sex: '',
    image: '',
    createAt: '',
    _id: '',
  },
  registrationError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USERS_DATA:
      return {
        ...state,
        users: action.payload,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        registrationError: null,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        registrationError: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
