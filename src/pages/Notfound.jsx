import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Nofound() {
  const styleImg = {
    width: "100%",
    maxWidth: "400px",
    height: "100%",
    maxHeight: "369px",
  };

  const navigateTo = useNavigate();

  return (
    <section
      id="not-found-page"
      className="d-flex flex-column justify-content-center align-items-center min-vh-100"
    >
      <Image
        src="/images/404.png"
        className="mb-4"
        style={styleImg}
        loading="lazy"
      />
      <h3 className="text-s1">404 | Not found</h3>

      <p className="text-s3 my-4 text-center">
        Maaf, halaman tidak ditemukan. <br />
        Silakan cek kembali URL atau kembali ke halaman utama.
      </p>

      <Button
        variant="dark"
        className="rounded-0"
        onClick={() => navigateTo("/")}
      >
        Ke halaman utama
      </Button>
    </section>
  );
}
