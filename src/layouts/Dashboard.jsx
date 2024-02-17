import { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "../components/Footer";

export default function LayoutDashboard() {
  const [show, setShow] = useState(false);
  function onShowMenu() {
    setShow(!show);
  }

  let cssShowMenu = show ? "d-block" : "d-none";

  const { token } = useSelector((store) => store.user);
  if (!token) return <Navigate to="/admin/login" replace />;

  return (
    <>
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

            <Button variant="outline-danger" className="rounded-0 my-md-0 my-2">
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
