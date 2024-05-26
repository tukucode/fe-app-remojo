import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";
import useLoading from "../../../hooks/useLoading";

import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DetailUser from "../../../components/detail/User";
import Dialog from "../../../components/Dialog";

export default function DataPenggunaDetail() {
  const { user_id } = useParams();

  let navList = [
    {
      to: "/admin/data-pengguna",
      title: "Data Pengguna",
      isActive: false,
    },
    {
      to: "/admin/data-pengguna",
      title: "Detail",
      isActive: true,
    },
    {
      to: `/admin/data-pengguna/${user_id}`,
      title: user_id,
      isActive: true,
    },
  ];

  const axios = useAxios();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const [isShow, setIsShow] = useState(false);

  function handleOnSave(data) {
    let { _id: user_id, deleted_at: status } = data;

    if (status) {
      restoreUser(user_id);
      return
    };

    removeUser(user_id);
  }

  function restoreUser(user_id) {
    showLoading();

    axios
      .patch(`api/v1/user/restore/${user_id}`)
      .then(() => {
        setIsShow(false);
        window.location.reload();
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  function removeUser(user_id) {
    showLoading();

    axios
      .delete(`api/v1/user/remove/${user_id}`)
      .then(() => {
        setIsShow(false);
        window.location.reload();
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  const [data, setData] = useState(null);

  let titleModal =
    data && data.deleted_at ? "Aktifkan akun" : "Nonaktifkan akun";
  let textModal =
    data && data.deleted_at
      ? "Apakah anda ingin mengaktifkan kembali akun ini?"
      : "Anda ingin menonaktifkan akun ini?";

  function getDetailUser() {
    showLoading();

    axios
      .get(`api/v1/user/${user_id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        let { message } = error.response.data;
        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  useEffect(() => {
    getDetailUser();
  }, []);

  return (
    <section id="detail-pengguna" className="min-vh-100">
      <Dialog
        isShow={isShow}
        isLoading={isLoading}
        labelCancel="Batalkan"
        labelSave="Setujui"
        onCancel={() => setIsShow(false)}
        onSave={() => handleOnSave(data)}
      >
        <h4 className="text-s2">{titleModal}</h4>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          fill="currentColor"
          className="bi bi-person-square"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
        </svg>

        <p className="text-p3">{textModal}</p>
      </Dialog>

      <NavBreadcrumb navList={navList} />

      {data ? (
        <DetailUser detail={data} onActivation={() => setIsShow(true)} />
      ) : null}
    </section>
  );
}
