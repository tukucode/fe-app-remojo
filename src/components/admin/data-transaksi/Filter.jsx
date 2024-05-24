import { Card, Row, Col, Form, Button } from "react-bootstrap";

import InputDate from "../../InputDate";

export default function DataTransaksiFilter(props) {
  let { q, start_date, end_date, onChangeValue, onClickSearch } = props;

  return (
    <Card className="rounded-0 shadow-sm">
      <Card.Body>
        <Row>
          <Col lg="6" md="6" sm="12">
            <Form.Control
              name="q"
              value={q}
              onChange={(e) => onChangeValue(e)}
              placeholder="Transaksi ID atau Order ID"
              className="rounded-0 bg-light"
            />
          </Col>

          <Col lg="2" md="3" sm="4" className="mt-md-0 mt-3">
            <InputDate
              name="start_date"
              placeholder="Tanggal mulai sewa"
              valueInput={start_date}
              onChangeDate={(e) => { onChangeValue(e) }}
            />
          </Col>

          <Col lg="2" md="3" sm="4" className="mt-md-0 mt-3">
            <InputDate
              name="end_date"
              placeholder="Tanggal selesai sewa"
              valueInput={end_date}
              onChangeDate={(e) => { onChangeValue(e) }}
            />
          </Col>

          <Col lg="2" md="3" sm="4" className="mt-md-0 mt-3">
            <Button
              variant="dark"
              className="rounded-0 w-100"
              onClick={onClickSearch}
            >
              <i className="bi bi-search"></i> Cari Pesanan
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}