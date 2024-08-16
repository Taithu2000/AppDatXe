import {
  GET_USER,
  GET_USER_DATA,
  USER_REGISTER,
  GET_USERS,
  UPDATE_USER,
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
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case USER_REGISTER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER:
      const updateUser = state.users.map(user => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else {
          return user;
        }
      });

      return {
        ...state,
        users: updateUser,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
