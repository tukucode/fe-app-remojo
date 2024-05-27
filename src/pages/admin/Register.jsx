import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import useLoading from "../../hooks/useLoading";
import useAxios from "../../hooks/useAxios";

import FormAuth from "../../components/FormAuth";

export default function CustomerRegister() {
  const navigateTo = useNavigate();

  const schema = Yup.object({
    first_name: Yup.string()
      .required("First name is required")
      .max(20, "First name must not exceed 20 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/,
        "Phone number invalid. (+62|62|0) 8xxxxxxx"
      ),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password invalid"
      ),
  });

  const initialForm = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  };

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    onSubmit: onSubmitForm,
  });

  const axios = useAxios();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();

  function onSubmitForm(values) {
    showLoading();

    axios
      .post("api/v1/user/register", values)
      .then((response) => {
        let { token } = response.data.data;

        // SET TOKEN TO STORE USER
        dispatch({ type: "SET_TOKEN", value: token });

        // SET TOKEN TO LOCAL STORAGE
        localStorage.setItem("token", token);

        toast.success("Register success");
        navigateTo("/rental-mobil");
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  return (
    <main
      id="container__register__admin"
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <FormAuth title="Buat akun Remojo" subtitle="Selamat datang!">
        <Form onSubmit={Formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="first_name"
              value={Formik.values.first_name}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.first_name}
              placeholder="Nama depan"
              className="rounded-0"
              autoComplete="off"
              maxLength="30"
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
              placeholder="Nama belakang"
              className="rounded-0"
              autoComplete="off"
              maxLength="30"
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
              className="rounded-0"
              autoComplete="off"
              maxLength="16"
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.email}
              placeholder="Email"
              className="rounded-0"
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              name="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              isInvalid={!!Formik.errors.password}
              placeholder="Password"
              className="rounded-0"
              autoComplete="off"
            />
            <Form.Control.Feedback type="invalid">
              {Formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="dark" className="rounded-0 w-100">
            Daftar
          </Button>

          <p className="text-center mt-3">
            Sudah mempunyai akun? silahkan masuk{" "}
            <span className="text-primary" onClick={() => navigateTo("/login")}>
              disini
            </span>
            .
          </p>
        </Form>
      </FormAuth>
    </main>
  );
}
