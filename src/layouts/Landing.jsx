import { Outlet } from "react-router-dom";

export default function LayoutLanding() {
  return (
    <>
      <h1>LANDING</h1>

      <Outlet key="layout-landing" />
    </>
  );
}
