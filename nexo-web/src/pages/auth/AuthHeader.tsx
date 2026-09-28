import React from "react";
import styles from "./Auth.module.css";

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
          src="/logoicon.png"
          alt="Code't Lab"
          className={styles.logo}
        />

        <p className={styles.brandName}>
          Code't Lab
        </p>

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