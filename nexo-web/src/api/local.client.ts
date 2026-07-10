import axios from "axios";

const localApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL_NEXO,


    headers: {
        "Content-Type": "application/json",
        "X-API-Key": "pk_nexo_b3d13a218584b8cb408b301d4b206529",
    },
});

localApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
export default localApi;