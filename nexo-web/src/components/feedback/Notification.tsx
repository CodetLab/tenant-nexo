import { useEffect, useState } from "react";

import type { FeedbackStatus } from "../../types/feedback";
import styles from "./Notification.module.css";

interface NotificationProps {
    status: FeedbackStatus;
    message?: string;
    onClose?: () => void;
}

const content: Record<
    Exclude<FeedbackStatus, "idle">,
    {
        title: string;
        symbol: string;
        duration: number | null;
    }
> = {
    pending: {
        title: "Procesando",
        symbol: "○",
        duration: null,
    },

    success: {
        title: "Completado",
        symbol: "✓",
        duration: 6000,
    },

    error: {
        title: "Error",
        symbol: "!",
        duration: 10000,
    },
};

const EXIT_DURATION = 250;

export default function Notification({
    status,
    message,
    onClose,
}: NotificationProps) {
    const [closing, setClosing] = useState(false);

    const isIdle = status === "idle";

    const close = () => {
        if (closing) {
            return;
        }

        setClosing(true);
    };

    useEffect(() => {
        if (isIdle) {
            return;
        }

        setClosing(false);

        const duration = content[status].duration;

        if (duration === null) {
            return;
        }

        const timeout = window.setTimeout(() => {
            setClosing(true);
        }, duration);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [status, isIdle]);

    useEffect(() => {
        if (!closing) {
            return;
        }

        const timeout = window.setTimeout(() => {
            onClose?.();
        }, EXIT_DURATION);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [closing, onClose]);

    if (isIdle) {
        return null;
    }

    const { title, symbol } = content[status];

    return (
        <div
            className={[
                styles.notification,
                styles[status],
                closing ? styles.closing : "",
            ].join(" ")}
            role={status === "error" ? "alert" : "status"}
            aria-live={
                status === "error"
                    ? "assertive"
                    : "polite"
            }
        >
            <span
                className={styles.indicator}
                aria-hidden="true"
            >
                {symbol}
            </span>

            <div className={styles.content}>
                <span className={styles.title}>
                    {title}
                </span>

                {message && (
                    <span className={styles.message}>
                        {message}
                    </span>
                )}
            </div>


            {onClose && (
                <button
                    type="button"
                    className={styles.close}
                    onClick={close}
                    aria-label="Cerrar notificación"
                >
                    ×
                </button>
            )}
        </div>
    );
}