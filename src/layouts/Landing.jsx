import { useState, useEffect } from "react";
import { Container, Navbar, Button, Nav } from "react-bootstrap";
import { Outlet, useLocation, NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import useLoading from "../hooks/useLoading";

import Loading from "../components/Loading";
import Footer from "../components/Footer";

export default function LayoutLanding() {
  const [show, setShow] = useState(false);
  let cssShowMenu = show ? "d-block" : "d-none";
  function onShowMenu() {
    setShow(!show);
  }

  const { pathname } = useLocation();
  useEffect(() => {
    return () => {
      window.scrollTo(0, 0);
    };
  }, [pathname]);

  const { isLoading } = useLoading();
  let componentLoading;
  if (isLoading) componentLoading = <Loading />;

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
                to="/beranda"
                className="inactive ms-md-2"
                active-class-name="active"
              >
                Beranda
              </NavLink>

              <NavLink
                to="/rental-mobil"
                className="inactive ms-md-2"
                active-class-name="active"
              >
                Rental Mobil
              </NavLink>
            </Nav>

            <Button variant="outline-dark" className="rounded-0 my-md-0 my-2 me-3">
              Daftar
            </Button>

            <Button variant="dark" className="rounded-0 my-md-0 my-2">
              Masuk
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Outlet key="layout-landing" />
      </Container>

      <Footer />
    </>
  );
}
