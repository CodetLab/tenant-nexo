import { useState } from "react";
import { register } from "../services/auth.service";
import type { RegisterInput } from "../types/auth.types";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (data: RegisterInput) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await register(data);
      setSuccess("Cuenta creada exitosamente");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error al registrar usuario");
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