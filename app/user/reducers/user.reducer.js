import * as user from '../actions/user.actions';

const initialState = {
  me: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
  },
  loading: false
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case user.ADD:
      return {...state, me: action.payload};
    case user.START_LOADING:
      return {...state, loading: true};
    case user.STOP_LOADING:
      return {...state, loading: false};
    default:
      return state;
  }
};

export const getUserDetails = state => state.user.me;