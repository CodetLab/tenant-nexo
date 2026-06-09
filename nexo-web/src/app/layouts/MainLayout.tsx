import { Outlet } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.content}>
        <Topbar />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}