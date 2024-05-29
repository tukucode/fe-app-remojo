import { Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

export default function Forbidden() {
  const styleImg = {
    width: "100%",
    maxWidth: "400px",
    height: "100%",
    maxHeight: "369px",
  };

  const { token } = useSelector((store) => store.user);
  const { role_name } = jwtDecode(token);
  const dispatch = useDispatch();

  function handleBeranda() {
    // REMOVE TOKEN AT LOCAL STORAGE
    localStorage.removeItem("token");

    // REASSIGN TOKEN AT REDUCER USER
    dispatch({ type: "SET_TOKEN", value: null });

    let href = role_name === '"admin"' ? "/admin/login" : "/login";

    // HARD RELOAD TO PAGE LOGIN
    window.location.href = href;
  }

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
      <h3 className="text-s1">403 | Forbiden Access</h3>

      <p className="text-s3 my-4 text-center">
        Maaf, akses ditolak. <br /> Anda tidak memiliki izin untuk mengakses
        halaman ini.
      </p>

      <Button variant="dark" className="rounded-0" onClick={handleBeranda}>
        Ke halaman utama
      </Button>
    </section>
  );
}
