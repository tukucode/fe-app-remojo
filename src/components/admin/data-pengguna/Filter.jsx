/* eslint-disable react/prop-types */
import { Card, Row, Col, Form, Button } from "react-bootstrap";

export default function DataPenggunaFilter(props) {
  let { q, sort_by, onChangeValue, onClickSearch } = props;

  return (
    <Card className="rounded-0 shadow-sm">
      <Card.Body>
        <Row>
          <Col lg="8" md="6" sm="8">
            <Form.Control
              name="q"
              value={q}
              onChange={(e) => onChangeValue(e)}
              placeholder="Nama, email atau nomor handphone..."
              className="rounded-0 bg-light"
            />
          </Col>

          <Col lg="2" md="3" sm="4" className="mt-sm-0 mt-3">
            <Form.Select
              name="sort_by"
              value={sort_by}
              onChange={(e) => onChangeValue(e)}
              className="rounded-0 bg-light"
            >
              <option value="">Urutkan data</option>
              <option value="asc">Data lama</option>
              <option value="desc">Data baru</option>
            </Form.Select>
          </Col>

          <Col lg="2" md="3" sm="12" className="mt-md-0 mt-3">
            <Button
              variant="outline-dark"
              className="rounded-0 w-100"
              onClick={onClickSearch}
            >
              <i className="bi bi-search"></i> Cari pengguna
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
