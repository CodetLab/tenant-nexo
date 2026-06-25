import api from "../api/client";
import localApi from "../api/local.client";

export async function getMyProfile() {
    const res = await api.get("/account/me");
    return res.data;
}

export async function syncMyProfile() {
    const res = await localApi.post("/sync/sync");
    return res.data;
}