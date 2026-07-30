import type { InternalAxiosRequestConfig } from "axios";

export const authInterceptor = (
    config: InternalAxiosRequestConfig
) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
};