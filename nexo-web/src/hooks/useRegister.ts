import { useState } from "react";
import { register } from "../services/auth.service";
import { resolveError } from "../components/feedback/errorResolver";
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

      return true;
    } catch (error: unknown) {
      setError(resolveError(error));
      return false;
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