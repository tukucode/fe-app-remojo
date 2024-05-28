// src/insertMidtransScript.js
const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

if (clientKey) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
  script.setAttribute("data-client-key", clientKey);

  document.head.appendChild(script);
} else {
  console.error("Midtrans client key is not defined.");
}
