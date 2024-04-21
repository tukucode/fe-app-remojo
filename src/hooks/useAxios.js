import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useAxios() {
  const { token } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

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

      if (code === 401) {
        let { message } = error.response.data;
        toast.error(message);
      }

      if (code === 403) {
        let { message } = error.response.data;
        toast.error(message);

        // REMOVE TOKEN AT LOCAL STORAGE
        localStorage.removeItem("token");

        // REASSIGN TOKEN AT REDUCER USER
        dispatch({ type: "SET_TOKEN", value: null });

        // HARD RELOAD TO PAGE LOGIN
        window.location.href = "/admin/login";
      }

      if (code === 404) {
        navigateTo("/404");
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
