import axios from "axios";
import { authInterceptor } from "./auth.interceptor";

const localApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL_NEXO,


    headers: {
        "Content-Type": "application/json",
        "X-API-Key": "pk_nexo_b3d13a218584b8cb408b301d4b206529",
    },
});

localApi.interceptors.request.use(authInterceptor);
export default localApi;