import React from "react";
import styles from "./AuthHeader.module.css";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
}) => {
  return (
    <>
      <div className={styles.brand}>
        <img
          src="logo2sinfondo.svg"
          alt="Code't Lab"
          className={styles.logo}
        />

        <p className={styles.productName}>
          Nexo
        </p>
      </div>

      <div className={styles.header}>
        <h1>{title}</h1>

        <p className={styles.subtitle}>
          {subtitle}
        </p>
      </div>
    </>
  );
};