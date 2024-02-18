import { Card, Row, Col, Button } from "react-bootstrap";
import EmptyProduct from "../../EmptyProduct";

import { formatIDR } from "../../../utils/formater.js";

// eslint-disable-next-line react/prop-types
export default function ListProduct({ dataProduct = [] }) {
  const divStyle = { marginTop: "2.875rem" };
  if (!dataProduct.length) return <EmptyProduct />;

  return (
    <div style={divStyle}>
      <Row>
        {dataProduct.map((product, index) => (
          <Col key={`col-card-product-${index + 1}`} lg="3">
            <Card className="rounded-0">
              <Card.Img variant="top" src={product.detail_storage.secure_url} />
              <Card.Body className="text-center">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{formatIDR(product.price)}</Card.Text>
                <Button variant="dark" className="rounded-0 w-50">
                  Edit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
