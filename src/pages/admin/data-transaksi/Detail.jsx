/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DetailTransaction from "../../../components/detail/Transaction";
import Dialog from "../../../components/Dialog";

import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";

export default function DataTransaksiDetail() {
  const { transaction_id } = useParams();

  let navList = [
    {
      to: "/admin/data-transaksi",
      title: "Data Transaksi",
      isActive: false,
    },
    {
      to: "/admin/data-transaksi",
      title: "Detail",
      isActive: true,
    },
    {
      to: `/admin/data-transaksi/${transaction_id}`,
      title: transaction_id,
      isActive: true,
    },
  ];

  const axios = useAxios();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const [isShow, setIsShow] = useState(false);

  const schema = Yup.object({
    note_refund: Yup.string()
      .required("Field is required")
      .min(10, "Input must be at least 10 characters"),
  });

  const initialForm = {
    note_refund: "",
  };

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    onSubmit: handleRefund,
  });

  function handleClose() {
    Formik.resetForm({
      values: initialForm,
      touched: {},
    });

    setIsShow(false);
  }

  function handleRefund(values) {
    showLoading();

    axios
      .put(`api/v1/transaction/refund/${transaction_id}`, values)
      .then(() => {
        setIsShow(false);
        window.location.reload();
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

  const [data, setData] = useState(null);
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
    <section id="detail-transaction" className="min-vh-100">
      <Dialog
        alignText="text-start"
        isShow={isShow}
        isLoading={isLoading}
        labelCancel="Batalkan"
        labelSave="Setujui"
        onCancel={handleClose}
        onSave={Formik.handleSubmit}
      >
        <h3 className="text-s3">Form Refund</h3>

        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            name="note_refund"
            value={Formik.values.note_refund}
            onChange={Formik.handleChange}
            isInvalid={!!Formik.errors.note_refund}
            placeholder="Alasan refund..."
          />
          <Form.Control.Feedback type="invalid">
            {Formik.errors.note_refund}
          </Form.Control.Feedback>
        </Form.Group>
      </Dialog>

      <NavBreadcrumb navList={navList} />

      {data ? (
        <DetailTransaction detail={data} onRefund={() => setIsShow(true)} />
      ) : null}
    </section>
  );
}
