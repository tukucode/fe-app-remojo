/* eslint-disable react/prop-types */
import { Card, Button } from "react-bootstrap";
import { formatIDR } from "../utils/formater.js";

export default function CardProduct(props) {
  const { product = {}, titleBtn = "Edit", onClickBtn = () => { } } = props;

  const styleImg = {
    aspectRatio: "1/1",
    objectFit: "contain",
    objectPosition: "center",
    opacity: product.deleted_at ? "0.3" : "1",
  };

  let element;
  if (product && product.deleted_at) {
    element = (
      <div className="position-relative d-flex justify-content-center align-items-center">
        <Card.Text className="position-absolute">
          Kendaraan dalam perbaikan.
        </Card.Text>
        <Card.Img
          variant="top"
          src={product.detail_storage.secure_url}
          className="rounded-0"
          style={styleImg}
        />
      </div>
    );
  } else {
    element = (
      <Card.Img
        variant="top"
        src={product.detail_storage.secure_url}
        className="rounded-0"
        style={styleImg}
      />
    );
  }

  return (
    <Card className="rounded-0 h-100">
      {element}

      <Card.Body className="text-center">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{formatIDR(product.price)}</Card.Text>

        <Button variant="dark" className="rounded-0 w-50" onClick={onClickBtn}>
          {titleBtn}
        </Button>
      </Card.Body>
    </Card>
  );
}
