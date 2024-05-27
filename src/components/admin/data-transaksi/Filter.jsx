/* eslint-disable react/prop-types */
import { Card, Row, Col, Form, Button } from "react-bootstrap";

import InputDate from "../../InputDate";

export default function DataTransaksiFilter(props) {
  let {
    q,
    start_date,
    end_date,
    minDate = null,
    maxDate = null,
    placeHolder = "Transaksi ID atau Order ID",
    labelBtn = "Cari Pesanan",
    onChangeValue,
    onClickSearch,
  } = props;

  return (
    <Card className="rounded-0 shadow-sm">
      <Card.Body>
        <Row>
          <Col xl="6" lg="5" md="12" sm="12">
            <Form.Control
              name="q"
              value={q}
              onChange={(e) => onChangeValue(e)}
              placeholder={placeHolder}
              className="rounded-0 bg-light"
            />
          </Col>

          <Col xl="2" lg="2" md="4" sm="4" className="mt-lg-0 mt-3">
            <InputDate
              name="start_date"
              placeholder="Tanggal mulai sewa"
              minDate={minDate}
              maxDate={maxDate}
              valueInput={start_date}
              onChangeDate={(e) => {
                onChangeValue(e);
              }}
            />
          </Col>

          <Col xl="2" lg="2" md="4" sm="4" className="mt-lg-0 mt-3">
            <InputDate
              name="end_date"
              placeholder="Tanggal selesai sewa"
              minDate={minDate}
              maxDate={maxDate}
              valueInput={end_date}
              onChangeDate={(e) => {
                onChangeValue(e);
              }}
            />
          </Col>

          <Col xl="2" lg="3" md="4" sm="4" className="mt-lg-0 mt-3">
            <Button
              variant="dark"
              className="rounded-0 w-100"
              onClick={onClickSearch}
            >
              <i className="bi bi-search"></i> {labelBtn}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
