import { Row, Col } from "react-bootstrap";
import EmptyProduct from "../../empty/Product";
import CardProduct from "../../card/Product";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CustomerRentalMobilList({ cars = [] }) {
  const navigateTo = useNavigate();
  function handleCheckout(_id) {
    navigateTo(`/rental-mobil/checkout/${_id}`);
  }

  const divStyle = { margin: "2.875rem 0" };
  if (!cars.length) return <EmptyProduct />;

  return (
    <div style={divStyle}>
      <Row className="g-3">
        {cars.map((car, index) => (
          <Col key={`col-card-car-${index + 1}`} xl="3" lg="4" md="6" xs="12">
            <CardProduct
              product={car}
              titleBtn="Sewa sekarang"
              onClickBtn={() => handleCheckout(car._id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
