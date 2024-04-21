/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";

import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataMobilForms from "../../../components/admin/data-mobil/Forms";

export default function DataMobilEdit() {
  const { product_id } = useParams();

  let navList = [
    {
      to: "/admin/data-mobil",
      title: "Data Mobil",
      isActive: false,
    },
    {
      to: "/admin/data-mobil",
      title: "Edit",
      isActive: true,
    },
    {
      to: `/admin/data-mobil`,
      title: product_id,
      isActive: true,
    },
  ];

  const axios = useAxios();
  const { showLoading, hideLoading } = useLoading();
  const [data, setData] = useState(null);

  // HANDLE REMOVE PRODUCT
  function handleRemoveProduct() {
    showLoading();

    axios
      .delete(`api/v1/product/remove/${product_id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  // HANDLE RESTORE PRODUCT
  function handleRestoreProduct() {
    showLoading();

    axios
      .patch(`api/v1/product/restore/${product_id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  // HANDLE UPDATE FORM
  const navigateTo = useNavigate();
  function handleUpdateForm(values) {
    const formData = new FormData();

    for (const key in values) {
      if (values[key] !== null) {
        formData.append(key, values[key]);
      }
    }

    showLoading();

    axios
      .put(`api/v1/product/${product_id}`, formData)
      .then((response) => {
        toast.success(response.data.message);

        // redirect to page data mobil
        navigateTo("/admin/data-mobil");
      })
      .catch((error) => {
        let { message, data } = error.response.data;

        if (data) {
          for (let resError of data.errors) {
            toast.error(resError.message);
          }

          return;
        }

        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  // HANDLE GET Detail Product
  function getDetailProduct() {
    showLoading();

    axios
      .get(`api/v1/product/${product_id}`)
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
    getDetailProduct();
  }, []);

  const isMaintenance = data ? data.deleted_at : false;
  const variantBtn = isMaintenance ? "dark" : "danger";
  const labelBtn = isMaintenance ? "Selesai perbaikan" : "Perbaikan";

  function switchMaintenance() {
    if (isMaintenance) {
      handleRestoreProduct();
      return;
    }

    handleRemoveProduct();
  }

  return (
    <section id="edit--product">
      <NavBreadcrumb navList={navList} />

      <DataMobilForms isEdit dataProduct={data} onSubmitForm={handleUpdateForm}>
        <Button
          type="button"
          variant={variantBtn}
          className="rounded-0 ms-2"
          onClick={switchMaintenance}
        >
          {labelBtn}
        </Button>
      </DataMobilForms>
    </section>
  );
}
