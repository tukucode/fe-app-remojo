/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

import CustomerBerandaHero from "../components/customer/beranda/Hero";
import CustomerBerandaInfo from "../components/customer/beranda/Info";
import CustomerBerandaCars from "../components/customer/beranda/Cars";

import moment from "moment";
import useAxios from "../hooks/useAxios";
import useLoading from "../hooks/useLoading";

export default function Home() {
  const axios = useAxios();
  const { showLoading, hideLoading } = useLoading();

  const [cars, setCars] = useState([]);
  const params = {
    q: "",
    start_date: moment().endOf("day").format("YYYY-MM-DD"),
    end_date: moment().endOf("day").format("YYYY-MM-DD"),
    page: 1,
    per_page: 8,
  };

  useEffect(() => {
    showLoading();

    axios
      .get("api/v1/customer/product", { params })
      .then((response) => {
        setCars(response.data.data);
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
  }, []);

  return (
    <section id="beranda">
      <CustomerBerandaHero />

      <Container>
        <CustomerBerandaInfo />

        <CustomerBerandaCars cars={cars} />
      </Container>
    </section>
  );
}
