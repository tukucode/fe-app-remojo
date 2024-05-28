/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";

import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataTransaksiFilter from "../../../components/admin/data-transaksi/Filter";
import DataTransaksiList from "../../../components/admin/data-transaksi/List";
import BtnPagination from "../../../components/BtnPagination";

import moment from "moment";

let navList = [
  {
    to: "/admin/data-transaksi",
    title: "Data Transaksi",
    isActive: true,
  },
];
export default function DataTransaction() {
  const [load, setLoad] = useState(true);
  const { showLoading, hideLoading } = useLoading();
  const startOfDate = moment().startOf("month").format("YYYY-MM-DD");
  const endOfDate = moment().endOf("month").format("YYYY-MM-DD");

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
  const [transactions, setTransaction] = useState([]);

  function handleCheckStatus(order_id) {
    showLoading();

    axios
      .post(`api/v1/transaction/check-status/${order_id}`)
      .then(() => {
        // onReload
        setLoad(true);
      })
      .catch((error) => {
        console.log(error.response);
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  function loadDataProduct() {
    showLoading();

    axios
      .get("api/v1/transaction", { params })
      .then((response) => {
        setTransaction(response.data.data);

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
    if (load) loadDataProduct();
  }, [load]);

  return (
    <section id="list-data-transaksi" className="min-vh-100">
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
      />

      <BtnPagination
        dataProduct={transactions}
        currentPage={params.page}
        totalPage={totalPage}
        onPage={onPagePagination}
      />
    </section>
  );
}
