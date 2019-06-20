import axios from "axios";
import {baseUrl} from "../../axios/helper";
import {createUserQuery, updateUserPhoto, userQuery} from "../queries/user.queries";
import _ from "lodash";
import * as auth from "../../auth/thunks/auth.thunk";
import {add, startLoading, stopLoading} from "../actions/user.actions";

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
      .catch(() => {
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


export const updatePhoto = (payload) => {
  return dispatch => {
    dispatch(startLoading());
    axios.post(baseUrl, {
      query: updateUserPhoto(),
      variables: JSON.stringify({url: payload})
    })
      .then(response => {
        const {updateUserPhoto} = response.data.data
        dispatch(add(updateUserPhoto));
        dispatch(stopLoading());
      })
      .catch(() => {
        dispatch(stopLoading())
      })
  }
};