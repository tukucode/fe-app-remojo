export default function EmptyTransaction() {
  const divStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    marginTop: "2.875rem",
  };

  return (
    <div style={divStyle} className="flex-column text-center">
      <img src="/images/transaction_empty.svg" alt="transaction_empty.svg" className="mb-4" />

      <h3 className="text-h3 text-secondary">Mohon maaf, <br /> transaksi tidak ditemukan.</h3>
    </div>
  );
}
