import Card from "../../components/ui/Card/Card";

import styles from "./DashboardPage.module.css";

import {
  useAuth
} from "../../context/AuthContext";

import SessionManager from "../../components/account/sessions/SessionManager";
import AccountPage from "../../components/account/account/Account";


export default function DashboardPage() {


  const {
    logout
  } = useAuth();



  return (

    <div className={styles.grid}>

      <Card>
        <AccountPage />
      </Card>


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



      <Card>

        <SessionManager
          onLogout={logout}
        />

      </Card>


    </div>

  );

}