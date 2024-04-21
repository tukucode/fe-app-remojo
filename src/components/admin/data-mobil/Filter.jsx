/* eslint-disable react/prop-types */
import { Card, Row, Col, Form, Button } from "react-bootstrap";

export default function DataMobilFilter(props) {
  let { q, sort_by, onChangeValue, onClickSearch, onCreateNew } = props;

  return (
    <Card className="rounded-0 shadow-sm">
      <Card.Body>
        <Row>
          <Col lg="6" md="6" sm="12">
            <Form.Control
              name="q"
              value={q}
              onChange={(e) => onChangeValue(e)}
              placeholder="Toyota avanza"
              className="rounded-0 bg-light"
            />
          </Col>

          <Col lg="2" md="3" sm="4" className="mt-md-0 mt-3">
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

          <Col lg="2" md="3" sm="4" className="mt-md-0 mt-3">
            <Button
              variant="outline-dark"
              className="rounded-0 w-100"
              onClick={onClickSearch}
            >
              <i className="bi bi-search"></i> Cari mobil
            </Button>
          </Col>

          <Col lg="2" md="12" sm="4" className="mt-lg-0 mt-3">
            <Button
              variant="dark"
              className="rounded-0 w-100"
              onClick={onCreateNew}
            >
              <i className="bi bi-pencil-fill"></i> Buat baru
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
