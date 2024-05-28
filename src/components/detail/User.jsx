/* eslint-disable react/prop-types */
import { Row, Col, Image, Button } from "react-bootstrap";

export default function DetailUser({ detail, onActivation = () => {} }) {
  const styleImg = {
    aspectRatio: "1/1",
    objectFit: "contain",
    objectPosition: "center",
    width: "100%",
    height: "100%",
    maxHeight: "400px",
    border: "1px solid #ccc",
  };

  let { _id, detail_storage, first_name, last_name, email, phone, deleted_at } =
    detail;

  let secure_url = detail_storage
    ? detail_storage.secure_url
    : "/images/placeholder.png";
  let objectUser = {
    nama: `${first_name} ${last_name}`,
    email,
    ["No. Telephone"]: phone,
    status: deleted_at ? "Tidak Aktif" : "Aktif",
  };

  let classSpan = deleted_at ? "text-danger" : "text-primary";
  let labelText = deleted_at ? "Aktifkan akun" : "Nonaktifkan akun";
  let variantBtn = deleted_at ? "primary" : "danger";

  return (
    <Row className="g-md-5 g-sm-4 g-3">
      <Col lg="3" md="4" sm="5">
        <Image
          src={secure_url}
          alt="user_profile"
          style={styleImg}
          loading="lazy"
        />
      </Col>

      <Col lg="9" md="8" sm="7">
        <h4 className="text-s2">Informasi data diri</h4>

        {Object.entries(objectUser).map(([key, value]) => (
          <p className="text-p4 mb-2" key={`data_diri_user_${key}`}>
            <span className="text-capitalize">{key}</span>:{" "}
            {key === "status" ? (
              <span className={classSpan}>{value}</span>
            ) : (
              value
            )}
          </p>
        ))}

        <Button
          variant={variantBtn}
          className="rounded-0"
          onClick={() => onActivation(deleted_at, _id)}
        >
          {labelText}
        </Button>
      </Col>
    </Row>
  );
}
