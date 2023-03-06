import axios from "axios";

const getData = (res) => res.data;

export const AxiosHttpClient = (instance) => ({
  instance,
  get: (endpoint, options) => instance.get(endpoint, options).then(getData),

  rawGet: (endpoint, options) => instance.get(endpoint, options),

  delete: (endpoint, options) =>
    instance.delete(endpoint, options).then(getData),

  rawPost: (endpoint, data, options) => instance.post(endpoint, data, options),

  post: (endpoint, data, options) =>
    instance.post(endpoint, data, options).then(getData),

  put: (endpoint, data, options) =>
    instance.put(endpoint, data, options).then(getData),

  patch: (endpoint, data, options) =>
    instance.patch(endpoint, data, options).then(getData),
});

const instance = axios.create({ baseURL: "https://api.github.com" });

instance.interceptors.request.use((request) => {  
  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export const apiClient = AxiosHttpClient(instance);
