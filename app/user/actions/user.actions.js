import * as auth from '../../auth/actions/auth.actions';
import _ from 'lodash';
import axios from "axios/index";
import {baseUrl} from "../../axios/helper";
import {createUserQuery, userQuery} from "../queries/user.queries";

export const ADD = '[Add] Add';
export const CREATE = '[Create] User';
export const LOAD = '[User] Load';
export const START_LOADING = '[User] Start Loading';
export const STOP_LOADING = '[User] Stop Loading';

export const add = (payload) => ({
  type: ADD,
  payload
});

export const load = () => {
  return dispatch => {
    dispatch(startLoading());
    axios.post(baseUrl, {
      query: userQuery(),
    })
      .then(response => {
        const {viewer} = response.data.data;
        dispatch(add(viewer));
        dispatch(stopLoading());
      })
      .catch(error => {
        dispatch(stopLoading())
      })
  };
};

export const create = (payload) => {
  return dispatch => {
    dispatch(startLoading());
    axios.post(baseUrl, {
      query: createUserQuery(),
      variables: JSON.stringify({params: payload})
    })
      .then(() => {
        const loginDetails = _.omit(payload, 'firstName', 'lastName');
        dispatch(auth.login(loginDetails));
        dispatch(stopLoading());
      })
      .catch(() => {
        dispatch(stopLoading())
      })
  }
};

export const startLoading = () => ({
  type: START_LOADING,
});

export const stopLoading = () => ({
  type: STOP_LOADING,
});