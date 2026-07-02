import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "pk_nexo_b3d13a218584b8cb408b301d4b206529",
  },
});

export default api;