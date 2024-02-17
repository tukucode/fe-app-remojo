import { useFormik } from "formik";
import * as Yup from "yup";

import FormAuth from "../../components/FormAuth";
import axios from "axios";
import useLoading from "../../hooks/useLoading";

import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
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

  function onSubmitForm(values) {
    showLoading();

    axios
      .post("https://be-app-remojo.vercel.app/api/v1/user/login", values)
      .then((response) => {
        let { token } = response.data.data;

        // SET TOKEN TO STORE USER
        dispatch({ type: "SET_TOKEN", value: token });

        // SET TOKEN TO LOCAL STORAGE
        localStorage.setItem("token", token);

        toast.success("Login success");
        navigateTo("/admin");
      })
      .catch((error) => {
        let errors = error.response.data.data.errors;
        let { message } = errors[0];
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  return (
    <main
      id="container__login__admin"
      className=" d-flex justify-content-center align-items-center min-vh-100"
    >
      <FormAuth
        title="Masuk ke Dashboard"
        subtitle="Silahkan isi akun admin anda."
      >
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
        </Form>
      </FormAuth>
    </main>
  );
}
