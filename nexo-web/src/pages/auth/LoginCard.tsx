import React, { useState } from "react";
import styles from "./Auth.module.css";

import { useLogin } from "../../hooks/useLogin";
import { useAuth } from "../../hooks/useAuth";
import { useNotification } from "../../context/NotificationContext";
import { resolveError } from "../../components/feedback/errorResolver";

import { useNavigate } from "react-router-dom";

import { syncMyProfile } from "../../services/sync.service";

import { AuthHeader } from "./AuthHeader";

interface LoginProps {
    onSwitchToRegister: () => void;
}

export const LoginCard: React.FC<LoginProps> = ({
    onSwitchToRegister,
}) => {
    const navigate = useNavigate();

    const { login } = useAuth();
    const { notify } = useNotification();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
        submit,
        loading,
    } = useLogin();

    const iniciarSesion = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        notify.pending("Iniciando sesión...");

        const response = await submit({
            email,
            password,
            appSlug: "nexo",
        });

        if (!response) {
            return;
        }

        const { token, user } = response;

        if (!token || !user) {
            console.error(
                "Respuesta de login inválida:",
                response
            );

            notify.error(
                "El servidor devolvió una respuesta de autenticación inválida."
            );

            return;
        }

        login(token, user);

        notify.pending(
            "Sincronizando tu perfil..."
        );

        try {
            await syncMyProfile();

            notify.success(
                "Inicio de sesión correcto."
            );

            navigate("/organization-check");
        } catch (error: unknown) {
            console.error(
                "Error sincronizando el perfil:",
                error
            );

            notify.error(resolveError(error));
        }
    };

    const isFormValid =
        email.includes("@") &&
        password.length >= 4;

    return (
        <div className={styles.container}>
            <AuthHeader
                title="Bienvenido"
                subtitle="Ingresa a tu cuenta"
            />

            <form
                onSubmit={iniciarSesion}
                className={styles.form}
            >
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Correo electrónico"
                        className={styles.formInput}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Contraseña"
                        className={styles.formInput}
                        autoComplete="current-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className={styles.btn}
                >
                    {loading
                        ? "Ingresando..."
                        : "Iniciar Sesión"}
                </button>
            </form>

            <button
                type="button"
                onClick={onSwitchToRegister}
                className={styles.linkBtn}
            >
                Ir a registro
            </button>
        </div>
    );
};