import * as auth from '../actions/auth.actions';

const initialState = {
  authenticated: false,
  loading: false,
  authenticationToken: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.AUTHENICATED:
      return {...state, authenticated: true};
    case auth.UNAUTHENTICATED:
      return {...state, authenticated: false};
    case auth.START_LOADING:
      return {...state, loading: true};
    case auth.STOP_LOADING:
      return {...state, loading: false};
    case auth.UPDATE_AUTHENTICATION_TOKEN:
      return {...state, authenticationToken: action.payload};
    default:
      return state;
  }
};

export const getAuthenticated = state => state.auth.authenticated;
export const getAuthenticationToken = state => state.auth.authenticationToken;
