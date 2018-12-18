import axios from "axios";

export const configureAxiosRequestInterceptor = (store) => {
  axiosInstance.interceptors.request.use((config) => {
      return config;
    },
    (error) => Promise.reject(error)
  )
};

export const configureAxiosErrorResponseInterceptor = (store) => {
  axios.interceptors.response.use(response => {
    return response;
  }, error => {
    return Promise.reject(error);
  })
};
