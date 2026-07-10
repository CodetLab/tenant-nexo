import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import type { User } from "../types/auth.types";
import { syncMyProfile } from "../services/sync.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    token: string,
    userData: User
  ) => void;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");

    sessionStorage.removeItem(
      "profile_synced"
    );

    setUser(null);
  };

  const login = (
    token: string,
    userData: User
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user_data",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  useEffect(() => {
    async function restoreSession() {
      const token =
        localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const savedUser =
          localStorage.getItem(
            "user_data"
          );

        if (savedUser) {
          setUser(
            JSON.parse(savedUser)
          );
        }

        const alreadySynced =
          sessionStorage.getItem(
            "profile_synced"
          );

        if (!alreadySynced) {
          await syncMyProfile();

          sessionStorage.setItem(
            "profile_synced",
            "true"
          );
        }
      } catch (error) {
        console.error(
          "Error restaurando la sesión:",
          error
        );

        logout();
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {!loading ? (
        children
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Cargando aplicación...
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe ser usado dentro de un AuthProvider"
    );
  }

  return context;
}