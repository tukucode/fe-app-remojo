export default function EmptyProduct() {
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    marginTop: "2.875rem",
  };

  return (
    <div style={divStyle}>
      <img src="/images/product_empty.svg" alt="product_empty.svg" />
    </div>
  );
}
