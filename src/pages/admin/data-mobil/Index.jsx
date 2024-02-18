/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";

import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataMobilFilter from "../../../components/admin/data-mobil/Filter";
import ListProduct from "../../../components/admin/data-mobil/ListProduct";

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

  const [params, setParams] = useState({
    q: "",
    sort_by: "",
    page: 1,
    per_page: 20,
  });

  // SET INPUT PARAMS Q
  function onChangeParams(event) {
    let { name, value } = event.target;
    setParams((params) => {
      return { ...params, [name]: value };
    });
  }

  const axios = useAxios();
  const [products, setProducts] = useState([]);
  function load() {
    showLoading();

    axios
      .get("api/v1/product", { params })
      .then((response) => {
        setProducts(response.data.data);
      })
      .finally(() => {
        hideLoading();
      });
  }

  useEffect(() => {
    load();
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <section id="list--data--mobil">
      <NavBreadcrumb navList={navList} />

      <DataMobilFilter
        q={params.q}
        sort_by={params.sort_by}
        onChangeValue={onChangeParams}
        onClickSearch={load}
        onCreateNew={() => navigateTo("/admin/data-mobil/buat-baru")}
      />

      <ListProduct dataProduct={products} />
    </section>
  );
}
