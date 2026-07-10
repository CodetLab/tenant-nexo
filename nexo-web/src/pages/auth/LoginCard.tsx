import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { syncMyProfile } from "../../services/sync.service";

interface LoginProps {
  onSwitchToRegister: () => void;
}

export const LoginCard: React.FC<LoginProps> = ({
  onSwitchToRegister,
}) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");

  const { submit, loading, error, success } = useLogin();

  const iniciarSesion = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await submit({
      email,
      password: pin,
      appSlug: "nexo",
    });

    if (!response) return;

    console.log("LOGIN RESPONSE:", response);

    const token = response.token;

    if (!token) {
      console.error("No llegó token del backend");
      return;
    }

    // 🔥 NO hay user en backend → lo construimos o lo dejamos null-safe
    const user = {
      email,
      id: "unknown",
      name: email.split("@")[0],
    };

    login(token, user);
    await syncMyProfile();
    navigate("/organization-check");
  };

  const isFormValid =
    email.includes("@") && pin.length >= 4;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src="logoicon.png"
          alt="Pathway Logo"
          className={styles.logo}
        />

        <h1>Bienvenido</h1>

        <p className={styles.subtitle}>
          Ingresa a tu cuenta
        </p>
      </div>

      <form onSubmit={iniciarSesion} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className={styles.formInput}
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN"
            className={styles.formInput}
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={styles.btn}
        >
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <button
        onClick={onSwitchToRegister}
        className={styles.linkBtn}
      >
        Ir a registro
      </button>
    </div>
  );
};