/* eslint-disable react/prop-types */
import { Card, Button } from "react-bootstrap";
import { formatIDR } from "../utils/formater.js";

export default function CardProduct({
  product = {},
  titleBtn = "Edit",
  onClickBtn = () => { },
}) {
  return (
    <Card className="rounded-0">
      <Card.Img
        variant="top"
        src={product.detail_storage.secure_url}
        className="rounded-0"
      />
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
