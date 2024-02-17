import { useSelector, useDispatch } from "react-redux";

export default function useLoading() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((store) => store.loading);

  function showLoading() {
    dispatch({ type: "SET_LOADING", value: true });
  }

  function hideLoading() {
    dispatch({ type: "SET_LOADING", value: false });
  }

  return {
    isLoading,
    showLoading,
    hideLoading,
  };
}
