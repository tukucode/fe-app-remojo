import { Row, Col } from "react-bootstrap";

import EmptyTransaction from "../../EmptyTransaction";
import CardTransaction from "../../card/Transaction";

export default function DataTransaksiList({ dataTransaksi = [] }) {

  const divStyle = { margin: "2.875rem 0" };
  if (!dataTransaksi.length) return <EmptyTransaction />;

  return (
    <div style={divStyle}>
      <Row className="g-3">
        {dataTransaksi.map((detailTransaction, index) => (
          <Col key={`col-card-transaction-${index + 1}`} xs="12">
            <CardTransaction
              transaction={detailTransaction}
            />
          </Col>
        ))}
      </Row>
    </div>
  )
}