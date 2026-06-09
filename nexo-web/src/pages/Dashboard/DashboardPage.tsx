import Card from "../../components/ui/Card/Card";

import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
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
    </div>
  );
}