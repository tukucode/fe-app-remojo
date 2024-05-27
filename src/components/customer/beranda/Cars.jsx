import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CardProduct from "../../card/Product";
import EmptyProduct from "../../empty/Product";

// eslint-disable-next-line react/prop-types
export default function CustomerBerandaCars({ cars = [] }) {
  const navigateTo = useNavigate();
  function handleCheckout(product_id) {
    navigateTo(`/rental-mobil/checkout/${product_id}`);
  }

  let element;
  if (!cars.length) {
    element = <EmptyProduct />;
  } else {
    element = (
      <>
        <Row className="mt-4 mb-5 g-3">
          {cars.map((car, index) => (
            <Col
              key={`card-car-beranda-${index}}`}
              xl="3"
              lg="4"
              md="6"
              xs="12"
            >
              <CardProduct
                product={car}
                titleBtn="Sewa sekarang"
                onClickBtn={() => handleCheckout(car._id)}
              />
            </Col>
          ))}
        </Row>

        <div className="text-center mb-5">
          <Button
            variant="outline-dark"
            className="rounded-0"
            onClick={() => navigateTo("/rental-mobil")}
          >
            Tampilkan lebih banyak
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <h3 className="text-h3">Pilih kendaraan terbaikmu</h3>

      {element}
    </>
  );
}
