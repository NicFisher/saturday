import * as user from '../../user/actions/user.actions';
import {loginQuery} from '../queries/auth.queries';
import axios from 'axios';
import {baseUrl} from "../../axios/helper";
import {loginAlert} from "../helpers/login-alert";

export const AUTHENICATED = "[AUTH] Authenticated";
export const UNAUTHENTICATED = "[AUTH] Unauthenticated";
export const START_LOADING = "[AUTH] Start Loading";
export const STOP_LOADING = "[AUTH] Stop Loading";
export const UPDATE_AUTHENTICATION_TOKEN = "[AUTH] Update Authentication Token";
export const LOGOUT = "[AUTH] Logout";

// Actions

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

export const logout = () => ({
  type: LOGOUT
});
