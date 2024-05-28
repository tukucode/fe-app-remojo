/* eslint-disable react/prop-types */
import { Row, Col } from "react-bootstrap";
import EmptyTransaction from "../../empty/Transaction";
import CardUser from "../../card/User";

export default function ListDataPengguna({ dataUsers = [] }) {
  const divStyle = { margin: "2.875rem 0" };
  if (!dataUsers.length) return <EmptyTransaction />;

  return (
    <div style={divStyle}>
      <Row className="g-3">
        {dataUsers.map((user, index) => (
          <Col key={`col-card-user-${index + 1}`} xs="12">
            <CardUser detail={user} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
