import PayOS from "@payos/node";

const payos = new PayOS(
  process.env.PAYOS_CLIENT_ID || "client_id",
  process.env.PAYOS_API_KEY || "api_key",
  process.env.PAYOS_CHECKSUM_KEY || "checksum_key"
);

export default payos;
