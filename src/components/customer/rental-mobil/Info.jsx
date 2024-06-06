/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Row, Col, Image, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import moment from "moment";

import { formatIDR } from "../../../utils/formater";
import InputDate from "../../InputDate";

import { jwtDecode } from "jwt-decode";

export default function RentalMobilInfo({ detail, onSubmitForm = () => {} }) {
  const styleImg = {
    aspectRatio: "1/1",
    objectFit: "contain",
    objectPosition: "center",
    width: "100%",
    height: "100%",
    maxHeight: "400px",
    border: "1px solid #ccc",
  };

  const { _id: product_id, detail_storage, name, price, description } = detail;
  const toDay = moment().format("YYYY-MM-DD");

  const schema = Yup.object({
    start_date: Yup.string().required("Field is required"),
    end_date: Yup.string().required("Field is required"),
  });

  const initialForm = {
    start_date: "",
    end_date: "",
  };

  const { token } = useSelector((store) => store.user);

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    onSubmit: (values) => {
      let { user_id } = jwtDecode(token);

      let payload = {
        rental_duration: { ...values },
        user_id,
        product_ids: [product_id],
      };

      onSubmitForm(payload);
    },
  });

  return (
    <Row className="g-md-5 g-1">
      <Col lg="4" md="5" sm="12" xs="12" className="h-100">
        <Image
          src={detail_storage.secure_url}
          alt={detail_storage.public_id}
          style={styleImg}
          loading="lazy"
        />
      </Col>

      <Col lg="8" md="7" sm="12" xs="12" className="h-100">
        <h2 className="text-h2">{name}</h2>

        <p className="text-p1">{formatIDR(price ?? 0)} perhari</p>

        <hr />
        <p className="text-p3">{description}</p>
        <hr />

        <h4 className="text-h4 mb-3">Informasi Penting</h4>

        <h5 className="text-s4">Setelah Anda pesan</h5>
        <ul>
          <li>
            Penyedia akan menghubungi pengemudi melalui WhatsApp untuk meminta
            foto beberapa dokumen wajib.
          </li>
        </ul>

        <h5 className="text-s4">Saat pengambilan</h5>
        <ul>
          <li>
            Bawa KTP, SIM A, dan dokumen-dokumen lain yang dibutuhkan oleh
            penyedia rental.
          </li>
          <li>Tunjukan bukti pemesanan pelunasan sewa.</li>
          <li>
            Saat Anda bertemu dengan staf rental, cek kondisi mobil dengan staf.
          </li>
          <li>Setelah itu, baca dan tanda tangan perjanjian rental.</li>
        </ul>

        <h5 className="text-s4">Kebijakan refund & Perubahan jadwal sewa</h5>
        <ul>
          <li>
            Mengenai pengembalian dana/perubahan jadwal dapat dilakukan minimal
            24 jam sebelum waktu sewa dilakukan.
          </li>
          <li>
            Apabila telah memasuki waktu atau durasi penyewaan maka akan kami
            anggap tidak dapat direfund kembali.
          </li>
          <li>
            Perihal pengembalian dana (refund) dapat menghubungi pihak rental
            dengan syarat ketentuan yang berlaku.
          </li>
          <li>
            Perubahan jadwal sewa dapat melakukan dengan klik ubah jadwal sewa
            di menu Daftar Sewa.
          </li>
        </ul>

        <Form onSubmit={Formik.handleSubmit}>
          <Row className="g-xl-3 g-2">
            <Col xl="3" lg="4" md="6" xs="12">
              <InputDate
                name="start_date"
                placeholder="Tanggal mulai sewa"
                minDate={toDay}
                valueInput={Formik.values.start_date}
                onChangeDate={Formik.handleChange}
                isInvalid={!!Formik.errors.start_date}
              >
                <Form.Control.Feedback type="invalid">
                  {Formik.errors.start_date}
                </Form.Control.Feedback>
              </InputDate>
            </Col>

            <Col xl="3" lg="4" md="6" xs="12">
              <InputDate
                name="end_date"
                placeholder="Tanggal selesai sewa"
                minDate={toDay}
                valueInput={Formik.values.end_date}
                onChangeDate={Formik.handleChange}
                isInvalid={!!Formik.errors.end_date}
              >
                <Form.Control.Feedback type="invalid">
                  {Formik.errors.end_date}
                </Form.Control.Feedback>
              </InputDate>
            </Col>

            <Col xl="3" lg="4">
              <Button type="submit" variant="dark" className="rounded-0 w-100">
                Bayar sekarang
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
