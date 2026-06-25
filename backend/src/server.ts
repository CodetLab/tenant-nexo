import dotenv from "dotenv";

dotenv.config();

console.log("Starting server with env:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET ? "****" : null,
});
import app from "./app";

const PORT =
  Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});