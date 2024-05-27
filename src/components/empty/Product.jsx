export default function EmptyProduct() {
  const divStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    marginTop: "2.875rem",
  };

  return (
    <div style={divStyle}>
      <img src="/images/product_empty.svg" alt="product_empty.svg" />

      <h3 className="text-h3 text-secondary text-center mt-4">
        Mohon maaf, <br /> saat ini mobil tidak tersedia.
      </h3>
    </div>
  );
}
