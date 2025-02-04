/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";

import * as Yup from "yup";

export default function DataMobilForms(props) {
  const {
    isEdit = false,
    dataProduct = null,
    onSubmitForm = () => { },
    children,
  } = props;

  const schema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .max(50, "Name must not exceed 50 characters"),
    price: Yup.number().integer().positive(),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must have at least 10 letters")
      .max(350, "Description must not exceed 350 characters"),
    image: isEdit ? null : Yup.mixed().required("Image is required"),
  });

  const initialForm = {
    name: "",
    price: 0,
    description: "",
    image: null,
  };

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    onSubmit: (values) => onSubmitForm(values),
  });

  // ONCHANGE INPUT FILE
  const [srcImage, setSrcImage] = useState(null);
  function handleChangeFile(event) {
    // ASSIGN VALUE TO INITIAL FORM IMAGE
    let file = event.target.files[0];
    Formik.values.image = file;

    // SET URL FILE TO STATE SRC IMAGE
    setSrcImage(URL.createObjectURL(file));

    // TOUCH FORM INPUT FILE IMAGE
    Formik.setFieldTouched("image", true);
  }

  // RESET FORM
  const refInputFile = useRef();
  function onResetForm() {
    // reset input file
    refInputFile.current.value = null;

    // just in case form edit
    let urlImage = isEdit && dataProduct ? dataProduct.detail_storage.secure_url : null

    // reset state src image
    setSrcImage(urlImage);

    // reset formik
    Formik.resetForm({
      values: initialForm,
      touched: {},
    });

    if (urlImage) window.location.reload()
  }

  const styleImg = {
    height: "306px",
    width: "100%",
    objectFit: "contain",
    objectPosition: "center",
    border: "1px solid #ccc",
  };

  const disableSubmitBtn =
    isEdit && dataProduct ? dataProduct.deleted_at : false;
  const labelBtn = isEdit ? "Perbaharui data" : "Buat data baru";

  useEffect(() => {
    if (isEdit && dataProduct) {
      // REASSIGN DATA PRODUCT TO INITIAL FORM FORMIK
      Formik.values.name = dataProduct.name;
      Formik.values.price = dataProduct.price;
      Formik.values.description = dataProduct.description;

      // set IMAGE URL TO SRC IMAGE
      setSrcImage(dataProduct.detail_storage.secure_url);
    }
  }, [isEdit, dataProduct]);

  return (
    <Row>
      <Col md="3" sm="12">
        <img
          src={srcImage ? srcImage : "/images/placeholder.png"}
          alt="product image"
          style={styleImg}
        />
      </Col>

      <Col md="9" sm="12" className="p-16">
        <Form onSubmit={Formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="product-name"
              name="name"
              value={Formik.values.name}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.name}
              placeholder="Nama mobil"
              className="rounded-0"
              autoComplete="off"
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              id="product-price"
              name="price"
              value={Formik.values.price}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.price}
              placeholder="Harga sewa mobil"
              className="rounded-0"
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              id="product-description"
              name="description"
              value={Formik.values.description}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.description}
              placeholder="Deskripsi mobil"
              className="rounded-0"
            />

            <Form.Control.Feedback type="invalid">
              {Formik.errors.description}
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

          <Button type="button" className="rounded-0" onClick={onResetForm}>
            Reset
          </Button>

          {children}

          <Button
            disabled={disableSubmitBtn}
            type="submit"
            variant="success"
            className="rounded-0 mx-2"
          >
            {labelBtn}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
