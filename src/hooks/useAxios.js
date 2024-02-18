import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useAxios() {
  const { token } = useSelector((store) => store.user);

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
  });

  // onRequest
  axiosInstance.interceptors.request.use(
    (config) => {
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // onResponse
  axiosInstance.interceptors.response.use(
    (config) => {
      return config;
    },
    (error) => {
      const code = error.response.status;

      if (code === 400) {
        let { message } = error.response.data;
        toast.error(message);
      }

      if (code === 401) {
        let { message } = error.response.data;
        toast.error(message);
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
