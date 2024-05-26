import { useState, useEffect } from "react";

import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";

import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataPenggunaFilter from "../../../components/admin/data-pengguna/Filter";
import ListDataPengguna from "../../../components/admin/data-pengguna/List";
import BtnPagination from "../../../components/BtnPagination";

let navList = [
  {
    to: "/admin/data-pengguna",
    title: "Data Pengguna",
    isActive: true,
  },
];

export default function DataPengguna() {
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
  const [users, setUsers] = useState([]);

  function loadDataUsers() {
    showLoading();

    axios
      .get("api/v1/user", { params })
      .then((response) => {
        setUsers(response.data.data);

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
    if (load) loadDataUsers();
  }, [load]);

  return (
    <section id="list-data-pengguna" className="min-vh-100">
      <NavBreadcrumb navList={navList} />

      <DataPenggunaFilter
        q={params.q}
        sort_by={params.sort_by}
        onChangeValue={onChangeParams}
        onClickSearch={onSearchData}
      />

      <ListDataPengguna dataUsers={users} />

      <BtnPagination
        dataProduct={users}
        currentPage={params.page}
        totalPage={totalPage}
        onPage={onPagePagination}
      />
    </section>
  );
}
