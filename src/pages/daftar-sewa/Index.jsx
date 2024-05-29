/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import moment from "moment";

import NavBreadcrumb from "../../components/NavBreadcrumb";
import DataTransaksiFilter from "../../components/admin/data-transaksi/Filter";
import BtnPagination from "../../components/BtnPagination";
import DataTransaksiList from "../../components/admin/data-transaksi/List";

import useLoading from "../../hooks/useLoading";
import useAxios from "../../hooks/useAxios";

let navList = [
  {
    to: "/admin/daftar-sewa",
    title: "Daftar Sewa",
    isActive: true,
  },
];

export default function DaftarSewa() {
  const [load, setLoad] = useState(true);
  const { showLoading, hideLoading } = useLoading();
  const startOfDate = moment().startOf("month").format("YYYY-MM-DD");
  const endOfDate = moment().endOf("month").format("YYYY-MM-DD");
  const navigateTo = useNavigate();

  const [params, setParams] = useState({
    q: "",
    start_date: startOfDate,
    end_date: endOfDate,
    page: 1,
    per_page: 20,
  });

  // SET INPUT PARAMS
  function onChangeParams(event) {
    let { name, value } = event.target;

    setParams({ ...params, [name]: value });

    if (name === "q") {
      if (value.length === 0) setLoad(true);

      return;
    }

    setLoad(true);
  }

  function onSearchData() {
    setParams({ ...params, page: 1 });
    setLoad(true);
  }

  const [totalPage, setTotalPage] = useState(0);
  function onPagePagination(page) {
    setParams({ ...params, page });
    setLoad(true);
  }

  const axios = useAxios();
  const [transactions, setTransactions] = useState([]);

  function handleCheckStatus(order_id) {
    showLoading();

    axios
      .post(`api/v1/transaction/check-status/${order_id}`)
      .then(() => {
        // onReload
        setLoad(true);
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  function loadDataTransaction() {
    showLoading();

    axios
      .get("api/v1/transaction", { params })
      .then((response) => {
        setTransactions(response.data.data);

        // SET TOTAL PAGE
        const { total } = response.data.pagination;
        let resultTotalPage = Math.ceil(total / params.per_page);
        setTotalPage(resultTotalPage);
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
        setLoad(false);
      });
  }

  useEffect(() => {
    if (load) loadDataTransaction();
  }, [load]);

  return (
    <section id="daftar-sewa" className="min-vh-100">
      <Container style={{ margin: "2.875rem auto" }}>
        <NavBreadcrumb navList={navList} />

        <DataTransaksiFilter
          q={params.q}
          start_date={params.start_date}
          end_date={params.end_date}
          onChangeValue={onChangeParams}
          onClickSearch={onSearchData}
        />

        <DataTransaksiList
          dataTransaksi={transactions}
          onRefresh={handleCheckStatus}
          goToDetail={(id) => {
            navigateTo(`/daftar-sewa/detail/${id}`);
          }}
        />

        <BtnPagination
          dataProduct={transactions}
          currentPage={params.page}
          totalPage={totalPage}
          onPage={onPagePagination}
        />
      </Container>
    </section>
  );
}
