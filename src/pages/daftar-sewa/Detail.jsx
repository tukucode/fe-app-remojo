/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import NavBreadcrumb from "../../components/NavBreadcrumb";
import DetailTransaction from "../../components/detail/Transaction";

import useAxios from "../../hooks/useAxios";
import useLoading from "../../hooks/useLoading";

export default function DaftarSewaDetail() {
  const { transaction_id } = useParams();

  let navList = [
    {
      to: "/daftar-sewa",
      title: "Daftar Sewa",
      isActive: false,
    },
    {
      to: "/daftar-sewa",
      title: "Detail",
      isActive: true,
    },
    {
      to: `/daftar-sewa/detail/${transaction_id}`,
      title: transaction_id,
      isActive: true,
    },
  ];

  const axios = useAxios();
  const [data, setData] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const navigateTo = useNavigate();

  function handlePayment() {
    const { token } = data;

    window.snap.pay(token, {
      onSuccess: function (result) {
        toast.success("Success payment");

        let { order_id } = result;
        handleCheckStatus(order_id);
      },
      onPending: function (result) {
        toast.info("Pending payment");

        let { order_id } = result;
        handleCheckStatus(order_id);
      },
      onError: function (result) {
        toast.error("Error payment");

        let { order_id } = result;
        handleCheckStatus(order_id);
      },
      onClose: function () {
        // CLOSE POPUP
        toast.info("You closed the popup without finishing the payment");
        navigateTo("/daftar-sewa");
      },
    });
  }

  function handleCheckStatus(order_id) {
    showLoading();

    axios
      .post(`api/v1/transaction/check-status/${order_id}`)
      .then(() => {
        navigateTo("/daftar-sewa");
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  function getDetailTransaction() {
    showLoading();

    axios
      .get(`api/v1/transaction/${transaction_id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  useEffect(() => {
    getDetailTransaction();
  }, []);

  return (
    <section id="daftar-sewa-detail" className="min-vh-100">
      <Container style={{ margin: "2.875rem auto" }}>
        <NavBreadcrumb navList={navList} />

        {data ? (
          <DetailTransaction
            detail={data}
            isHidePersonalData
            isCustomer
            onContinuePayment={() => handlePayment()}
          />
        ) : null}
      </Container>
    </section>
  );
}
