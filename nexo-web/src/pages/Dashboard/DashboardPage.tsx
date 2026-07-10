import Card from "../../components/ui/Card/Card";

import styles from "./DashboardPage.module.css";
import { useAuth } from "../../context/AuthContext";

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className={styles.grid}>
      <Card>
        Estudiantes
      </Card>

      <Card>
        Reuniones
      </Card>

      <Card>
        Estrategias
      </Card>

      <Card>
        Actividad reciente
      </Card>
      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}