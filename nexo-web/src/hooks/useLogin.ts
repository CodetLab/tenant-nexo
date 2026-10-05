import { useState } from "react";

import { useNotification } from "../context/NotificationContext";
import { resolveError } from "../components/feedback/errorResolver";

import { login as loginRequest } from "../services/auth.service";

interface LoginData {
    email: string;
    password: string;
    appSlug: string;
}

export function useLogin() {
    const { notify } = useNotification();

    const [loading, setLoading] = useState(false);

    const submit = async (data: LoginData) => {
        setLoading(true);

        try {
            const response = await loginRequest(data);

            return response;
        } catch (error: unknown) {
            console.error("Error en login:", error);

            notify.error(resolveError(error));

            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        submit,
        loading,
    };
}