import api from "../api/client";

export async function getMe() {
    const res = await api.get("/account/me");
    return res.data;
}

export async function updateProfile(data: {
    name: string;
}) {
    const res = await api.patch(
        "/account/profile",
        data
    );

    return res.data;
}

export async function changePassword(data: {
    currentPassword: string;
    newPassword: string;
}) {
    const res = await api.patch(
        "/account/password",
        data
    );

    return res.data;
}

export async function getSessions() {
    const res = await api.get(
        "/account/sessions"
    );

    return res.data;
}

export async function revokeSession(
    sessionId: string
) {
    const res = await api.delete(
        `/account/sessions/${sessionId}`
    );

    return res.data;
}

export async function revokeAllSessions(userId: string) {
    await api.delete(
        `/account/${userId}/sessions`
    );
}