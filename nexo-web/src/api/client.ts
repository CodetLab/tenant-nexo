import axios from "axios";
import { authInterceptor } from "./auth.interceptor";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
    "X-API-Key": "pk_nexo_b3d13a218584b8cb408b301d4b206529",
  },
});
api.interceptors.request.use(authInterceptor);

export default api;