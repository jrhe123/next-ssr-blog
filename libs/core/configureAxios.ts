import axios from "axios";

export default function makeApi(baseURL: string) {
  const api = axios.create({
    baseURL,
  });

  // set content-type
  api.defaults.headers.post["Content-Type"] = "application/json";
  api.defaults.headers.put["Content-Type"] = "application/json";
  api.defaults.headers.delete["Content-Type"] = "application/json";

  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );
  api.interceptors.response.use(
    (response) => {
      if (response?.status === 200) {
        return response?.data;
      } else {
        return {
          code: -1,
          msg: "API error",
          data: null,
        };
      }
    },
    (error) => Promise.reject(error)
  );
  return api;
}
