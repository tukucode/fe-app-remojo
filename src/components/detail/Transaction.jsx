/* eslint-disable react/prop-types */
import { useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

import { formatIDR, formatDate } from "../../utils/formater";

export default function DetailTransaction({ detail, onRefund = () => {} }) {
  const styleImg = {
    aspectRatio: "1/1",
    objectFit: "contain",
    objectPosition: "center",
    width: "100%",
    height: "100%",
    maxHeight: "400px",
    border: "1px solid #ccc",
  };

  const {
    order_id,
    transaction_id,
    gross_amount,
    rental_duration,
    status,
    note_refund,
    refund_date,
    detail_user,
    products,
  } = detail;

  let data_diri = {
    nama: `${detail_user.first_name} ${detail_user.last_name}`,
    email: detail_user.email,
    ["No. Telephone"]: detail_user.phone,
  };

  let data_transaksi = {
    ["No. Pesanan"]: order_id,
    ["No. transaksi"]: transaction_id ?? "-",
    ["Jumlah terbayarkan"]: formatIDR(gross_amount ?? 0),
    ["Rentang sewa"]: `${formatDate(
      rental_duration.start_date
    )} s.d. ${formatDate(rental_duration.end_date)}`,
    status,
    note_refund: note_refund ?? "-",
    refund_date: refund_date ?? "-",
  };

  const objStatus = {
    success: "text-success",
    pending: "text-primary",
    failure: "text-danger",
    refund: "text-danger",
  };

  function selecTextColor(valueStatus) {
    if (valueStatus in objStatus) {
      return objStatus[valueStatus];
    } else {
      return "text-dark";
    }
  }

  let [index, setIndex] = useState(0);

  return (
    <Row className="g-md-5 g-1">
      <Col lg="4" md="5" sm="12" xs="12" className="h-100">
        <Image
          src={products[index].image_detail.secure_url}
          alt={products[index].name}
          style={styleImg}
          loading="lazy"
        />

        {products.length > 1 ? (
          <div className="d-flex justify-content-center align-items-center py-2">
            <Button
              disabled={index === 0}
              size="sm"
              variant="dark"
              className="rounded-0 me-2"
              onClick={() => setIndex((value) => value - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </Button>

            <Button
              disabled={index === products.length - 1}
              size="sm"
              variant="dark"
              className="rounded-0"
              onClick={() => setIndex((value) => value + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </Button>
          </div>
        ) : null}
      </Col>

      <Col lg="8" md="7" sm="12" xs="12" className="h-100">
        <h2 className="text-h2">{products[index].name}</h2>

        <p className="text-p1">{formatIDR(products[index].price ?? 0)}</p>

        <hr />
        <p className="text-p3">{products[index].description}</p>
        <hr />

        <h4 className="text-h4 mb-3">Detail Transaksi</h4>

        <h5 className="text-s4">Data diri pemesan</h5>

        {Object.entries(data_diri).map(([key, value]) => (
          <p className="text-p4 mb-2" key={`data_diri_${key}`}>
            <span className="text-capitalize">{key}</span>: {value}
          </p>
        ))}

        <h5 className="text-s4 mt-3">Data transaksi</h5>

        {Object.entries(data_transaksi).map(([key, value]) => (
          <p className="text-p4 mb-2" key={`data_transaksi_${key}`}>
            <span className="text-capitalize">{key}</span>:{" "}
            <span className={selecTextColor(value)}>{value}</span>
          </p>
        ))}

        {status === "success" ? (
          <Button
            variant="danger"
            className="rounded-0 mt-3 w-25"
            onClick={onRefund}
          >
            Refund
          </Button>
        ) : null}
      </Col>
    </Row>
  );
}
