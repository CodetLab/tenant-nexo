import { createContext } from "react";
import type { User } from "../types/auth.types";

export interface AuthContextValue {
    user: User | null;
    loading: boolean;

    login: (
        token: string,
        userData: User
    ) => void;

    logout: () => void;
}

export const AuthContext =
    createContext<AuthContextValue | null>(null);