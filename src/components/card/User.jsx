import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CardUser({ detail }) {
  const styleImg = {
    aspectRatio: "1/1",
    objectFit: "contain",
    objectPosition: "center",
    width: "100%",
    height: "100%",
    maxHeight: "150px",
    border: "1px solid #ccc",
  };

  let { _id, detail_storage, first_name, last_name, email, phone, deleted_at } =
    detail;

  let src_img = detail_storage ? detail_storage : "/images/placeholder.png";
  let full_name = `${first_name} ${last_name}`;
  let status = deleted_at ? "Tidak aktif" : "Aktif";

  const navigateTo = useNavigate();
  function goToDetail(_id) {
    navigateTo(`/admin/data-pengguna/detail/${_id}`)
  }

  return (
    <Card className="rounded-0 mb-2">
      <Card.Body>
        <Row className="g-3">
          <Col lg="1" md="2" sm="3" xs="12">
            <Card.Img
              src={src_img}
              className="rounded-0"
              style={styleImg}
              loading="lazy"
            />
          </Col>

          <Col
            lg="4"
            md="4"
            sm="5"
            xs="12"
            className="d-flex flex-column align-items-start justify-content-center h-auto"
          >
            <Card.Title className="text-s4">{full_name}</Card.Title>

            <Card.Text className="text-p4">{email}</Card.Text>
          </Col>

          <Col
            lg="3"
            md="4"
            sm="4"
            xs="12"
            className="d-flex flex-column align-items-md-start align-items-sm-end justify-content-center h-auto"
          >
            <Card.Title className="text-s4">No. Handphone</Card.Title>
            <Card.Text className="text-p4">{phone}</Card.Text>
          </Col>

          <Col
            lg="1"
            md="2"
            sm="6"
            xs="12"
            className="d-flex flex-column align-items-lg-start align-items-md-end align-items-sm-start justify-content-center h-auto"
          >
            <Card.Title className="text-s4">Status</Card.Title>
            <Card.Text
              className={`text-p4 ${deleted_at ? "text-danger" : "text-primary"
                }`}
            >
              {status}
            </Card.Text>
          </Col>

          <Col
            lg="3"
            md="12"
            sm="6"
            xs="12"
            className="d-flex align-items-center justify-content-sm-end h-auto"
          >
            <Button variant="dark" className="rounded-0" onClick={() => { goToDetail(_id) }}>
              Detail
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
