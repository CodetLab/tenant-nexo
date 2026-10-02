import { Outlet } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import DepthField from "../../components/effects/deepField/DepthField";

import styles from "./MainLayout.module.css";

export default function MainLayout() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <div className={styles.content}>
        <Topbar />

        <main className={styles.main}>
          <DepthField>
            <Outlet />
          </DepthField>
        </main>
      </div>
    </div>
  );
}