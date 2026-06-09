import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useRegister } from "../../hooks/useRegister";

interface RegisterProps {
  onSwitchToLogin: () => void;
}

export const RegisterCard: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const { submit, loading, error, success } = useRegister();

  const registrarUsuario = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pin !== confirmPin) return;

    await submit({
      name,
      email,
      password: pin,
      appSlug: "nexo",
    });
  };

  const isFormValid =
    name.length >= 3 &&
    email.includes("@") &&
    pin.length >= 4 &&
    confirmPin.length >= 4;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="logoicon.png" alt="Logo" className={styles.logo} />
        <h1>Crear Cuenta</h1>
      </div>

      <form onSubmit={registrarUsuario} className={styles.form}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="PIN"
        />

        <input
          type="password"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value)}
          placeholder="Confirm PIN"
        />

        <button disabled={!isFormValid || loading}>
          {loading ? "Registrando..." : "Crear Cuenta"}
        </button>
      </form>

      {error && <p>{error}</p>}
      {success && <p>{success}</p>}

      <button onClick={onSwitchToLogin}>Ir a login</button>
    </div>
  );
};