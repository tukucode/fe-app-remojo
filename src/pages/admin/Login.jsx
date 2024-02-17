import { useFormik } from "formik";
import * as Yup from "yup";

import FormAuth from "../../components/FormAuth";
import { Form, Button } from "react-bootstrap";

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

  function onSubmitForm(values) {
    console.log("INI", values);
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
