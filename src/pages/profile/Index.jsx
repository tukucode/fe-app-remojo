/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

import NavBreadcrumb from "../../components/NavBreadcrumb";
import FormProfile from "../../components/FormProfile";

import useAxios from "../../hooks/useAxios";
import useLoading from "../../hooks/useLoading";

let navList = [
  {
    to: "/profile",
    title: "Profile Anda",
    isActive: true,
  },
];

export default function ProfileCustomer() {
  const axios = useAxios();
  const { showLoading, hideLoading } = useLoading();
  const { token } = useSelector((store) => store.user);
  const { user_id } = jwtDecode(token);

  const [detail, setDetail] = useState(null);

  function handleSubmit(values) {
    const formData = new FormData();

    for (const key in values) {
      if (values[key] !== null) {
        formData.append(key, values[key]);
      }
    }

    showLoading();

    axios
      .put(`api/v1/user/${user_id}`, formData)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        let { message, data } = error.response.data;

        if (data) {
          for (let resError of data.errors) {
            toast.error(`${resError.message} of ${resError.path}`);
          }

          return;
        }

        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  function getDetailUser() {
    showLoading();

    axios
      .get(`api/v1/user/${user_id}`)
      .then((response) => {
        setDetail(response.data.data);
      })
      .catch((error) => {
        const { message } = error.response;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  useEffect(() => {
    getDetailUser();
  }, []);

  return (
    <section id="user-profile" className="min-vh-100">
      <Container style={{ margin: "2.875rem auto" }}>
        <NavBreadcrumb navList={navList} />

        {detail ? (
          <FormProfile detail={detail} onSubmitForm={handleSubmit} />
        ) : null}
      </Container>
    </section>
  );
}
