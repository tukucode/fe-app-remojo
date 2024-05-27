import { useParams } from "react-router-dom";

export default function RentalMobilCheckout() {
  const { product_id } = useParams();

  return (
    <>
      <h1>Checkout {JSON.stringify(product_id)}</h1>
    </>
  );
}
