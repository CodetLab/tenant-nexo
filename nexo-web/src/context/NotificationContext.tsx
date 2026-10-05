import {
    createContext,
    useContext,
} from "react";

export interface NotificationOptions {
    message: string;
}

interface NotificationContextValue {
    notify: {
        pending: (message?: string) => void;
        success: (message: string) => void;
        error: (message: string) => void;
        close: () => void;
    };
}

export const NotificationContext =
    createContext<NotificationContextValue | null>(null);

export function useNotification() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error(
            "useNotification debe utilizarse dentro de NotificationProvider."
        );
    }

    return context;
}