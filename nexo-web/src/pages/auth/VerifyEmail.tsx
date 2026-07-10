import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "./VerifyEmailPage.module.css";
import { verifyEmail } from "../../services/auth.service";

type Status = "loading" | "success" | "error";

export default function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [status, setStatus] = useState<Status>("loading");
    const [message, setMessage] = useState("Verificando tu correo...");

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setStatus("error");
            setMessage("El enlace de verificación es inválido.");
            return;
        }

        const run = async () => {
            try {
                await verifyEmail(token);

                setStatus("success");
                setMessage("Tu correo fue verificado correctamente.");

                setTimeout(() => {
                    navigate("/auth");
                }, 2500);
            } catch (error: any) {
                setStatus("error");

                if (error?.response?.data?.message === "TOKEN_EXPIRED") {
                    setMessage("El enlace de verificación expiró.");
                } else if (
                    error?.response?.data?.message === "INVALID_TOKEN"
                ) {
                    setMessage("El enlace de verificación no es válido.");
                } else {
                    setMessage(
                        "No fue posible verificar tu correo."
                    );
                }
            }
        };

        run();
    }, [navigate, searchParams]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                {status === "loading" && (
                    <>
                        <div className={styles.icon}>⏳</div>

                        <h1>Verificando correo</h1>

                        <p>{message}</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className={styles.success}>✓</div>

                        <h1>Correo verificado</h1>

                        <p>{message}</p>

                        <button
                            onClick={() => navigate("/auth")}
                        >
                            Ir al inicio de sesión
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className={styles.error}>✕</div>

                        <h1>Error</h1>

                        <p>{message}</p>

                        <button
                            onClick={() => navigate("/auth")}
                        >
                            Volver
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}