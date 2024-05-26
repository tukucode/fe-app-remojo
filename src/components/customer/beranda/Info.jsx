import { Row, Col, Card } from "react-bootstrap";

export default function CustomerBerandaInfo() {
  return (
    <div style={{ padding: "48px 0" }}>
      <h2 className="text-h2 text-center">Langkah Mudah Rental Mobil Jogja</h2>
      <p className="text-p2 text-center mb-4">
        Silahkan simak langkah-langkah berikut ini:
      </p>

      <Row className="g-xl-5 g-lg-4 g-3">
        <Col lg="4" md="6" sm="12">
          <Card className="p-4 rounded-0 border-0 bg-light h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <h5 className="text-h5">Cari kendaran</h5>
              <p className="text-p4 m-0 text-center">
                Sesuai dengan kinginan anda dan keluarga
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg="4" md="6" sm="12">
          <Card className="p-4 rounded-0 border-0 bg-light h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <h5 className="text-h5">Mengkapi syarat dokumen</h5>
              <p className="text-p4 m-0 text-center">
                Cukup dengan menyiapkan dokumen KTP, SIM A dan NPWP
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg="4" md="6" sm="12">
          <Card className="p-4 rounded-0 border-0 bg-light h-100">
            <Card.Body className="d-flex flex-column align-items-center">
              <h5 className="text-h5">Metode pembayaran</h5>
              <p className="text-p4 m-0 text-center">
                Tersedia transfer bank, dompet digital dan lain-lain
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
