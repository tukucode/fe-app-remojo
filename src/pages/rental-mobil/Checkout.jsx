import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";

import useLoading from "../../hooks/useLoading";
import useAxios from "../../hooks/useAxios";

import NavBreadcrumb from "../../components/NavBreadcrumb";
import RentalMobilInfo from "../../components/customer/rental-mobil/Info";

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
  const navigateTo = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  function handleSubmit(values) {
    showLoading();

    axios
      .post("api/v1/transaction/checkout", values)
      .then((response) => {
        console.log("ini", response.data.data);
        let { token } = response.data.data;

        window.snap.pay(token, {
          onSuccess: function (result) {
            toast.success(result);
            navigateTo("/daftar-sewa");
          },
          onPending: function (result) {
            toast.info(result);
          },
          onError: function (result) {
            toast.error(result);
          },
          onClose: function () {
            // CLOSE POPUP
            toast.info("You closed the popup without finishing the payment");
            navigateTo("/daftar-sewa");
          },
        });
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
      <Container>
        <NavBreadcrumb navList={navList} />

        {detail ? (
          <RentalMobilInfo detail={detail} onSubmitForm={handleSubmit} />
        ) : null}
      </Container>
    </section>
  );
}
