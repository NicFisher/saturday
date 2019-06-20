import axios from "axios";

export const configureAxiosErrorResponseInterceptor = (store) => {
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  })
};
