import Spinner from "react-bootstrap/Spinner";

import "../assets/css/Loading.css";

export default function Loading() {
  return (
    <main id="main__loading">
      <Spinner animation="grow" variant="dark" />
      <Spinner size="sm" animation="grow" variant="dark" className="mx-2" />
      <Spinner animation="grow" variant="dark" />
    </main>
  );
}
