// src/services/organization.service.ts

import localApi from "../api/local.client";

export async function getMyOrganization() {
    const { data } = await localApi.get(
        "/organizations/my"
    );

    return data;
}

export async function getOrganizations() {
    const { data } = await localApi.get(
        "/organizations"
    );

    return data;
}

export async function createOrganization(
    payload: {
        name: string;
        slug: string;
    }
) {
    const { data } = await localApi.post(
        "/organizations",
        payload
    );

    return data;
}