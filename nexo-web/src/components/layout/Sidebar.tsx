import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.logo}>Nexo</h2>

      <nav>
        <NavLink to="/">Dashboard</NavLink>

        <NavLink to="/students">
          Estudiantes
        </NavLink>

        <NavLink to="/meetings">
          Reuniones
        </NavLink>

        <NavLink to="/strategies">
          Estrategias
        </NavLink>
        <NavLink to="/organizations">
          Organizaciones
        </NavLink>
      </nav>
    </aside>
  );
}