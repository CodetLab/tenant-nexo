import React, { useCallback, useState } from "react";

import Notification from "../components/feedback/Notification";
import { NotificationContext } from "../context/NotificationContext";

import type { FeedbackStatus } from "../types/feedback";

interface NotificationState {
    status: FeedbackStatus;
    message: string;
}

interface NotificationProviderProps {
    children: React.ReactNode;
}

export function NotificationProvider({
    children,
}: NotificationProviderProps) {
    const [notification, setNotification] =
        useState<NotificationState>({
            status: "idle",
            message: "",
        });

    const pending = useCallback(
        (message = "Procesando...") => {
            setNotification({
                status: "pending",
                message,
            });
        },
        []
    );

    const success = useCallback(
        (message: string) => {
            setNotification({
                status: "success",
                message,
            });
        },
        []
    );

    const error = useCallback(
        (message: string) => {
            setNotification({
                status: "error",
                message,
            });
        },
        []
    );

    const close = useCallback(() => {
        setNotification({
            status: "idle",
            message: "",
        });
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notify: {
                    pending,
                    success,
                    error,
                    close,
                },
            }}
        >
            {children}

            <Notification
                status={notification.status}
                message={notification.message}
                onClose={close}
            />
        </NotificationContext.Provider>
    );
}