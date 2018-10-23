import * as axios from "axios";

export const AxiosRequestInterceptor = (store) => {
  axios.interceptors.request.use(
    config => {
      console.log(store)
      debugger;
      if (!config.headers.Authorization) {
        const token = getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    error => Promise.reject(error)
  );
};