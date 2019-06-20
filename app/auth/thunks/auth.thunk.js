import axios from "axios";
import {baseUrl} from "../../axios/helper";
import {loginQuery} from "../queries/auth.queries";
import * as userThunks from "../../user/thunks/user.thunk";
import {loginAlert} from "../helpers/login-alert";
import {authenticated, startLoading, stopLoading, updateAuthenticationToken} from "../actions/auth.action";

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
        dispatch(userThunks.load());
        dispatch(stopLoading());
        dispatch(authenticated());
      })
      .catch(() => {
        loginAlert();
        dispatch(stopLoading())
      })
  };
};