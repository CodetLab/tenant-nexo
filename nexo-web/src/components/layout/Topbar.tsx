import styles from "./Topbar.module.css";

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <span>
        Escuela Especial
      </span>

      <span>
        María Gómez
      </span>
    </header>
  );
}