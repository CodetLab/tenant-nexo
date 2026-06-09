import { useState } from "react";
import { login } from "../services/auth.service";
import type { LoginInput } from "../types/auth.types";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (data: LoginInput) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await login(data);

      setSuccess("Inicio de sesión exitoso");

      return response;
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error,
    success,
  };
}