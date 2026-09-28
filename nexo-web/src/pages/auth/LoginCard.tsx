import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { syncMyProfile } from "../../services/sync.service";
import { AuthHeader } from "./AuthHeader";
interface LoginProps {
  onSwitchToRegister: () => void;
}
export const LoginCard: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { submit, loading, error, success } = useLogin();
  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await submit({ email, password, appSlug: "nexo" });
    if (!response) return;
    const { token, user } = response;
    if (!token || !user) {
      console.error("Respuesta de login inválida:", response);
      return;
    }
    login(token, user);
    await syncMyProfile();
    navigate("/organization-check");
  };
  const isFormValid = email.includes("@") && password.length >= 4;
  return (
    <div className={styles.container}>
      {" "}
      <AuthHeader
        title="Bienvenido"
        subtitle="Ingresa a tu cuenta"
      />
      <form onSubmit={iniciarSesion} className={styles.form}>
        {" "}
        <div className={styles.formGroup}>
          {" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className={styles.formInput}
            autoComplete="email"
            required
          />{" "}
        </div>{" "}
        <div className={styles.formGroup}>
          {" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className={styles.formInput}
            autoComplete="current-password"
            required
          />{" "}
        </div>{" "}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={styles.btn}
        >
          {" "}
          {loading ? "Ingresando..." : "Iniciar Sesión"}{" "}
        </button>{" "}
      </form>{" "}
      {error && <p className={styles.error}> {error} </p>}{" "}
      {success && <p className={styles.success}> {success} </p>}{" "}
      <button
        type="button"
        onClick={onSwitchToRegister}
        className={styles.linkBtn}
      >
        {" "}
        Ir a registro{" "}
      </button>{" "}
    </div>
  );
};
