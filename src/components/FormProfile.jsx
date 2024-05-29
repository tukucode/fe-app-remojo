/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useFormik } from "formik";
import { Row, Col, Image, Form, Button } from "react-bootstrap";

import * as Yup from "yup";

export default function FormProfile({ detail, onSubmitForm = () => {} }) {
  let { detail_storage } = detail;

  const styleImg = {
    aspectRatio: "1/1",
    objectFit: "contain",
    objectPosition: "center",
    width: "100%",
    height: "100%",
    maxHeight: "400px",
    border: "1px solid #ccc",
  };

  let secure_url = detail_storage
    ? detail_storage.secure_url
    : "/images/placeholder.png";

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    first_name: Yup.string()
      .required("First name is required")
      .max(20, "First name must not exceed 20 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
        "Phone number invalid. (+62|62|0) 8xxxxxxx"
      ),
    // image: Yup.mixed().required("Image is required"),
  });

  const initialForm = {
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    image: null,
  };

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    onSubmit: (values) => onSubmitForm(values),
  });

  function handleChangeFile(event) {
    // ASSIGN VALUE TO INITIAL FORM IMAGE
    let file = event.target.files[0];
    Formik.values.image = file;

    // TOUCH FORM INPUT FILE IMAGE
    Formik.setFieldTouched("image", true);
  }

  // RESET FORM
  const refInputFile = useRef();
  function handleReset() {
    // reset input file
    refInputFile.current.value = null;

    // reset formik
    Formik.resetForm({
      values: initialForm,
      touched: {},
    });

    window.location.reload();
  }

  let { email, first_name, last_name, phone } = detail;
  Formik.values.email = email;
  Formik.values.first_name = first_name;
  Formik.values.last_name = last_name;
  Formik.values.phone = phone;
  Formik.values.image = null;

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

        <Form onSubmit={Formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.email}
              disabled
              placeholder="Email"
              className="rounded-0"
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="first_name"
              value={Formik.values.first_name}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.first_name}
              placeholder="Nama depan"
              maxLength="30"
              autoComplete="off"
              className="rounded-0"
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.first_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="last_name"
              value={Formik.values.last_name}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.last_name}
              placeholder="Nama belakang"
              maxLength="30"
              autoComplete="off"
              className="rounded-0"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              name="phone"
              value={Formik.values.phone}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.phone}
              placeholder="Nomor handphone"
              maxLength="16"
              autoComplete="off"
              className="rounded-0"
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              ref={refInputFile}
              type="file"
              id="product-image"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={handleChangeFile}
              isInvalid={!!Formik.errors.image}
              className="rounded-0"
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            type="button"
            variant="primary"
            className="rounded-0 me-3"
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button type="submit" variant="success" className="rounded-0">
            Perbaharui data diri
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
