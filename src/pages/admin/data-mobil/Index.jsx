/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";

import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataMobilFilter from "../../../components/admin/data-mobil/Filter";
import ListProduct from "../../../components/admin/data-mobil/List";
import BtnPagination from "../../../components/BtnPagination";

let navList = [
  {
    to: "/admin/data-mobil",
    title: "Data Mobil",
    isActive: true,
  },
];

export default function DataMobil() {
  const navigateTo = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const [load, setLoad] = useState(true);

  const [params, setParams] = useState({
    q: "",
    sort_by: "",
    page: 1,
    per_page: 20,
  });

  // SET INPUT PARAMS Q
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
  const [products, setProducts] = useState([]);

  function loadDataProduct() {
    showLoading();

    axios
      .get("api/v1/product", { params })
      .then((response) => {
        setProducts(response.data.data);

        // SET TOTAL PAGE
        const { total } = response.data.pagination;
        let resultTotalPage = Math.ceil(total / params.per_page);
        setTotalPage(resultTotalPage);
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
    <section id="list--data--mobil">
      <NavBreadcrumb navList={navList} />

      <DataMobilFilter
        q={params.q}
        sort_by={params.sort_by}
        onChangeValue={onChangeParams}
        onClickSearch={onSearchData}
        onCreateNew={() => navigateTo("/admin/data-mobil/buat-baru")}
      />

      <ListProduct dataProduct={products} />

      <BtnPagination
        dataProduct={products}
        currentPage={params.page}
        totalPage={totalPage}
        onPage={onPagePagination}
      />
    </section>
  );
}
