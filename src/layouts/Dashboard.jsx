import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Footer from "../components/Footer";
import Loading from "../components/Loading";

import useLoading from "../hooks/useLoading";

export default function LayoutDashboard() {
  const [show, setShow] = useState(false);
  function onShowMenu() {
    setShow(!show);
  }

  let cssShowMenu = show ? "d-block" : "d-none";

  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  function onLogout() {
    // REMOVE TOKEN AT LOCAL STORAGE
    localStorage.removeItem("token");

    // REASSIGN TOKEN AT REDUCER USER
    dispatch({ type: "SET_TOKEN", value: null });

    // NAGITATION TO PAGE LOGIN
    navigateTo("/admin/login");
  }

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { isLoading } = useLoading();
  let componentLoading;
  if (isLoading) componentLoading = <Loading />;

  const { token } = useSelector((store) => store.user);
  if (!token) return <Navigate to="/admin/login" replace />;

  return (
    <>
      <ToastContainer position="top-right" />
      {componentLoading}

      <Navbar
        variant="light"
        expand="md"
        collapseOnSelect
        className="border-bottom border-light shadow-sm py-3"
      >
        <Container>
          <Navbar.Brand>
            <h3 className="text-h3 m-0 p-0">Remojo</h3>
          </Navbar.Brand>

          <Button
            variant="outline-dark"
            className="d-md-none d-block rounded-0"
            onClick={onShowMenu}
          >
            <i className="bi bi-list"></i>
          </Button>

          <Navbar.Collapse className={cssShowMenu}>
            <Nav className="me-auto">
              <NavLink
                to="/admin/data-mobil"
                className="inactive ms-md-2"
                active-class-name="active"
              >
                Data Mobil
              </NavLink>

              <NavLink
                to="/admin/data-transaksi"
                className="inactive mx-md-4 my-md-0 my-2"
                active-class-name="active"
              >
                Data Transaksi
              </NavLink>

              <NavLink
                to="/admin/data-pengguna"
                className="inactive"
                active-class-name="active"
              >
                Data Pengguna
              </NavLink>
            </Nav>

            <Button
              variant="outline-danger"
              className="rounded-0 my-md-0 my-2"
              onClick={onLogout}
            >
              Keluar
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-5">
        <Outlet key="layout-dashboard" />
      </Container>

      <Footer />
    </>
  );
}
