import { Card, Button, Row, Col } from "react-bootstrap";

import { formatDate } from "../../utils/formater";

export default function CardTransaction({ transaction, onRefresh = () => { } }) {
  const styleImg = {
    aspectRatio: "1/1",
    objectFit: "contain",
    objectPosition: "center",
    width: "100%",
    height: "100%",
    maxHeight: "150px",
    border: "1px solid #ccc",
  };

  let secure_url = transaction.products[0]["image_detail"]["secure_url"];
  let title = transaction.products[0].name;
  let transaction_id = transaction.transaction_id
    ? transaction.transaction_id
    : "-";
  let status = transaction.status;

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

  return (
    <Card className="rounded-0 mb-2">
      <Card.Body>
        <Row className="g-3">
          <Col lg="1" md="2" sm="3" xs="12">
            <Card.Img
              src={secure_url}
              className="rounded-0"
              style={styleImg}
              loading="lazy"
            />
          </Col>

          <Col
            lg="4"
            md="5"
            sm="5"
            xs="12"
            className="d-flex flex-column align-items-start justify-content-center h-auto"
          >
            <Card.Title className="text-s4">{title}</Card.Title>

            <Card.Text className="text-p4">
              Rentang sewa {formatDate(transaction.rental_duration.start_date)}{" "}
              s.d. {formatDate(transaction.rental_duration.end_date)}
            </Card.Text>
          </Col>

          <Col
            lg="3"
            md="3"
            sm="4"
            xs="6"
            className="d-flex flex-column align-items-lg-start align-items-md-end justify-content-center h-auto"
          >
            <Card.Title className="text-s4">No. transaksi</Card.Title>
            <Card.Text className="text-p4">{transaction_id}</Card.Text>
          </Col>

          <Col
            lg="1"
            md="2"
            sm="6"
            xs="6"
            className="d-flex flex-column align-items-lg-start align-items-md-end align-items-sm-start align-items-end justify-content-center h-auto"
          >
            <Card.Title className="text-s4">Status</Card.Title>
            <Card.Text className={["text-p4", selecTextColor(status)]}>
              {status}
            </Card.Text>
          </Col>

          <Col
            lg="3"
            md="12"
            sm="6"
            xs="12"
            className="d-flex align-items-center justify-content-end h-auto"
          >
            {status === "pending" ? (
              <Button
                variant="outline-dark"
                className="rounded-0 me-2"
                onClick={onRefresh}
              >
                <i className="bi bi-arrow-clockwise"></i>
              </Button>
            ) : null}

            <Button variant="dark" className="rounded-0">
              Detail
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
