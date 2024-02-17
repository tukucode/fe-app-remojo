import { Outlet } from "react-router-dom";

import Loading from "../components/Loading";
import useLoading from "../hooks/useLoading";

export default function LayoutDefault() {
  const { isLoading } = useLoading();

  let componentLoading;
  if (isLoading) componentLoading = <Loading />;

  return (
    <>
      {componentLoading}

      <Outlet key="layout-default" />
    </>
  );
}
