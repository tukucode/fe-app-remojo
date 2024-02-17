/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import "../assets/css/FormAuth.css";

export default function FormAuth(props) {
  let { children, title = "Title", subtitle = "Subtitle" } = props;

  return (
    <Card id="card__form__auth" className="rounded-0 shadow-sm">
      <Card.Body className="body__form">
        <Card.Title className="text-center text-dark text-h3 title__form">
          {title}
        </Card.Title>

        <Card.Subtitle className="text-dark text-p4 subtitle__form">
          {subtitle}
        </Card.Subtitle>

        {children}
      </Card.Body>
    </Card>
  );
}
