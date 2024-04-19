import { Row, Col } from "react-bootstrap";
import EmptyProduct from "../../EmptyProduct";
import CardProduct from "../../CardProduct";

// eslint-disable-next-line react/prop-types
export default function ListProduct({ dataProduct = [] }) {

  function onEditProduct(detailProduct) {
    console.log('ini ', detailProduct);
  }


  const divStyle = { marginTop: "2.875rem" };
  if (!dataProduct.length) return <EmptyProduct />;

  return (
    <div style={divStyle}>
      <Row>
        {dataProduct.map((detailProduct, index) => (
          <Col key={`col-card-product-${index + 1}`} lg="3">
            <CardProduct product={detailProduct} onClickBtn={() => onEditProduct(detailProduct)} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
