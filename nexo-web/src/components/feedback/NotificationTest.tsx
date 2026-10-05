import { useState } from "react";

import Notification from "./Notification";
import styles from "./NotificationTest.module.css";

type TestStatus =
    | "idle"
    | "pending"
    | "success"
    | "error";

export default function NotificationTest() {
    const [status, setStatus] =
        useState<TestStatus>("idle");

    const [message, setMessage] =
        useState("");

    const test = (
        nextStatus: TestStatus,
        nextMessage: string
    ) => {
        setStatus(nextStatus);
        setMessage(nextMessage);
    };

    const closeNotification = () => {
        setStatus("idle");
        setMessage("");
    };

    return (
        <div className={styles.panel}>
            <h2>Notification Test</h2>

            <div className={styles.buttons}>
                <button
                    onClick={() =>
                        test("idle", "")
                    }
                >
                    Ocultar
                </button>

                <button
                    onClick={() =>
                        test(
                            "pending",
                            "Iniciando sesión..."
                        )
                    }
                >
                    Pending
                </button>

                <button
                    onClick={() =>
                        test(
                            "success",
                            "Sesión iniciada correctamente."
                        )
                    }
                >
                    Success
                </button>

                <button
                    onClick={() =>
                        test(
                            "error",
                            "Credenciales incorrectas."
                        )
                    }
                >
                    Error de autenticación
                </button>

                <button
                    onClick={() =>
                        test(
                            "error",
                            "No se pudo conectar con el servidor."
                        )
                    }
                >
                    Error de conexión
                </button>

                <button
                    onClick={() =>
                        test(
                            "error",
                            "Ocurrió un error inesperado."
                        )
                    }
                >
                    Error genérico
                </button>

                <button
                    onClick={() =>
                        test(
                            "error",
                            "El servidor respondió con un error 500."
                        )
                    }
                >
                    Error 500
                </button>

                <button
                    onClick={() =>
                        test(
                            "success",
                            "OK."
                        )
                    }
                >
                    Mensaje corto
                </button>

                <button
                    onClick={() =>
                        test(
                            "error",
                            "No se pudo completar la operación porque el servidor no respondió correctamente. Verificá tu conexión e intentá nuevamente."
                        )
                    }
                >
                    Mensaje largo
                </button>

                <button
                    onClick={() =>
                        test(
                            "error",
                            "Este es un mensaje extremadamente largo utilizado para comprobar cómo se comporta la notificación cuando debe ocupar varias líneas y convivir correctamente con el botón de cierre sin romper el layout."
                        )
                    }
                >
                    Mensaje muy largo
                </button>
            </div>

            <p>
                Estado actual:{" "}
                <strong>{status}</strong>
            </p>

            <Notification
                status={status}
                message={message}
                onClose={closeNotification}
            />
        </div>
    );
}