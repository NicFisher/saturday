import * as user from '../../user/actions/user.actions';
import {loginQuery} from '../queries/auth.queries';
import axios from 'axios';
import {baseUrl} from "../../axios/helper";

export const AUTHENICATED = "[AUTH] Authenticated";
export const UNAUTHENTICATED = "[AUTH] Unauthenticated";
export const START_LOADING = "[AUTH] Start Loading";
export const STOP_LOADING = "[AUTH] Stop Loading";
export const UPDATE_AUTHENTICATION_TOKEN = "[AUTH] Update Authentication Token";
export const LOGOUT = "[AUTH] Logout";

export const authenticated = () => ({
  type: AUTHENICATED
});

export const unauthenticated = () => ({
  type: UNAUTHENTICATED
});

export const startLoading = () => ({
  type: START_LOADING
});

export const stopLoading = () => ({
  type: STOP_LOADING
});

export const updateAuthenticationToken = (payload) => ({
  type: UPDATE_AUTHENTICATION_TOKEN,
  payload
});

export const login = (payload) => {
  return dispatch => {
    dispatch(startLoading());
    axios.post(baseUrl, {
      query: loginQuery(),
      variables: JSON.stringify({params: payload}),
    })
      .then(response => {
        const {authenticationToken} = response.data.data.createAuthToken;
        axios.defaults.headers.common['Authentication'] = authenticationToken;
        dispatch(updateAuthenticationToken(authenticationToken));
        dispatch(user.load());
        dispatch(stopLoading());
        dispatch(authenticated());
      })
      .catch(error => {
        dispatch(stopLoading())
      })
  };
};

export const logout = () => ({
  type: LOGOUT
});