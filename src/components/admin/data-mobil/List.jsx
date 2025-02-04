import { Row, Col } from "react-bootstrap";
import EmptyProduct from "../../empty/Product";
import CardProduct from "../../card/Product";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ListProduct({ dataProduct = [] }) {
  const navigateTo = useNavigate();
  function goToEdit(_id) {
    navigateTo(`/admin/data-mobil/edit/${_id}`);
  }

  const divStyle = { margin: "2.875rem 0" };
  if (!dataProduct.length) return <EmptyProduct />;

  return (
    <div style={divStyle}>
      <Row className="g-3">
        {dataProduct.map((detailProduct, index) => (
          <Col
            key={`col-card-product-${index + 1}`}
            xl="3"
            lg="4"
            md="6"
            xs="12"
          >
            <CardProduct
              product={detailProduct}
              onClickBtn={() => goToEdit(detailProduct._id)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
