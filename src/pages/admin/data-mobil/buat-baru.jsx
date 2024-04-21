import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import NavBreadcrumb from "../../../components/NavBreadcrumb";
import DataMobilForms from "../../../components/admin/data-mobil/Forms";
import useLoading from "../../../hooks/useLoading";
import useAxios from "../../../hooks/useAxios";


let navList = [
  {
    to: "/admin/data-mobil",
    title: "Data Mobil",
    isActive: false,
  },
  {
    to: "/admin/data-mobil/buat-baru",
    title: "Buat Baru",
    isActive: true,
  },
];

export default function BuatBaru() {
  const { showLoading, hideLoading } = useLoading();
  const navigateTo = useNavigate();
  const axios = useAxios();

  function handleSubmitForm(values) {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    showLoading();

    axios
      .post("/api/v1/product/new", formData)
      .then((response) => {
        toast.success(response.data.message);

        // REDIRECT TO PAGE DATA MOBIL
        navigateTo("/admin/data-mobil");
      })
      .catch((error) => {
        let { message, data } = error.response.data;

        if (data) {
          for (let resError of data.errors) {
            toast.error(resError.message);
          }

          return;
        }

        toast.error(message);
      })
      .finally(() => {
        hideLoading();
      });
  }

  return (
    <section id="buat--baru">
      <NavBreadcrumb navList={navList} />

      <DataMobilForms onSubmitForm={handleSubmitForm} />
    </section>
  );
}
