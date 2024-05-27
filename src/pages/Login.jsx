import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import * as Yup from "yup";

import useLoading from "../hooks/useLoading";
import useAxios from "../hooks/useAxios";

import FormAuth from "../components/FormAuth";

export default function CustomerLogin() {
  const schema = Yup.object({
    email: Yup.string()
      .required("Field is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Field is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password invalid"
      ),
  });

  const initialForm = {
    email: "",
    password: "",
  };

  const Formik = useFormik({
    initialValues: initialForm,
    validationSchema: schema,
    onSubmit: onSubmitForm,
  });

  const { showLoading, hideLoading } = useLoading();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const axios = useAxios();
  function onSubmitForm(values) {
    showLoading();

    axios
      .post("api/v1/user/login", values)
      .then((response) => {
        let { token } = response.data.data;

        // SET TOKEN TO STORE USER
        dispatch({ type: "SET_TOKEN", value: token });

        // SET TOKEN TO LOCAL STORAGE
        localStorage.setItem("token", token);

        toast.success("Login success");
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

  const { token } = useSelector((store) => store.user);
  if (token) return <Navigate to="/rental-mobil" replace />;

  return (
    <main
      id="conteainer__login__customer"
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <FormAuth title="Masuk ke Remojo" subtitle="Selamat datang kembali!">
        <Form onSubmit={Formik.handleSubmit}>
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
            Masuk
          </Button>

          <p className="text-center mt-3">
            Belum punya akun? Silahkan daftar{" "}
            <span
              className="text-primary"
              onClick={() => navigateTo("/register")}
            >
              disini
            </span>
            .
          </p>
        </Form>
      </FormAuth>
    </main>
  );
}
