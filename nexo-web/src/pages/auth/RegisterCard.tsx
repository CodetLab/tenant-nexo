import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useRegister } from "../../hooks/useRegister";
import { AuthHeader } from "./AuthHeader";
interface RegisterProps {
  onSwitchToLogin: () => void;
}
export const RegisterCard: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { submit, loading, error, success } = useRegister();
  const registrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    await submit({
      name: name.trim(),
      email: email.trim(),
      password,
      appSlug: "nexo",
    });
  };
  const passwordsMatch = password === confirmPassword;
  const isFormValid =
    name.trim().length >= 3 &&
    email.includes("@") &&
    password.length >= 4 &&
    confirmPassword.length >= 4 &&
    passwordsMatch;
  return (
    <div className={styles.container}>
      {" "}
      <AuthHeader
        title="Bienvenido"
        subtitle="Crea tu cuenta"
      />
      <form onSubmit={registrarUsuario} className={styles.form}>
        {" "}
        <div className={styles.formGroup}>
          {" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className={styles.formInput}
            autoComplete="name"
            required
          />{" "}
        </div>{" "}
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
            autoComplete="new-password"
            required
          />{" "}
        </div>{" "}
        <div className={styles.formGroup}>
          {" "}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar contraseña"
            className={styles.formInput}
            autoComplete="new-password"
            required
          />{" "}
        </div>{" "}
        {confirmPassword.length > 0 && !passwordsMatch && (
          <p className={styles.error}> Las contraseñas no coinciden. </p>
        )}{" "}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={styles.btn}
        >
          {" "}
          {loading ? "Registrando..." : "Crear Cuenta"}{" "}
        </button>{" "}
      </form>{" "}
      {error && <p className={styles.error}> {error} </p>}{" "}
      {success && <p className={styles.success}> {success} </p>}{" "}
      <button
        type="button"
        onClick={onSwitchToLogin}
        className={styles.linkBtn}
      >
        {" "}
        Ir a login{" "}
      </button>{" "}
    </div>
  );
};