import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useLoading from "../../hooks/useLoading";
import useAxios from "../../hooks/useAxios";

import NavBreadcrumb from "../../components/NavBreadcrumb";
import { Container } from "react-bootstrap";

export default function RentalMobilCheckout() {
  const { product_id } = useParams();
  let navList = [
    {
      to: "/rental-mobil",
      title: "Rental Mobil",
      isActive: false,
    },
    {
      to: "/rental-mobil",
      title: "Checkout",
      isActive: true,
    },
    {
      to: `/rental-mobil/checkout/${product_id}`,
      title: product_id,
      isActive: true,
    },
  ];

  const axios = useAxios();
  const { showLoading, hideLoading } = useLoading();

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    showLoading();

    axios
      .get(`api/v1/customer/product/${product_id}`)
      .then((response) => {
        setDetail(response.data.data);
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="dedtail-checkout"
      className="min-vh-100"
      style={{ margin: "2.875rem auto" }}
    >
      {/* style={{ padding: "2.875rem atuo" }} */}
      <Container>
        <NavBreadcrumb navList={navList} />

        <h1>Checkout {JSON.stringify(detail)}</h1>
      </Container>
    </section>
  );
}
