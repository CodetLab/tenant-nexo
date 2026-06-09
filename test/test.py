from pathlib import Path

FILES = {
    "src/main.tsx": """
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/globals.css";
import "./styles/variables.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
""",

    "src/App.tsx": """
import RouterProvider from "./app/router";

function App() {
  return <RouterProvider />;
}

export default App;
""",

    "src/app/router/index.tsx": """
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

export default function RouterProvider() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
""",

    "src/app/router/routes.tsx": """
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardPage from "../../pages/Dashboard/DashboardPage";
import StudentsPage from "../../pages/Students/StudentsPage";
import StudentDetailPage from "../../pages/StudentDetail/StudentDetailPage";
import MeetingsPage from "../../pages/Meetings/MeetingsPage";
import MeetingDetailPage from "../../pages/MeetingDetail/MeetingDetailPage";
import StrategiesPage from "../../pages/Strategies/StrategiesPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/meetings/:id" element={<MeetingDetailPage />} />
        <Route path="/strategies" element={<StrategiesPage />} />
      </Route>
    </Routes>
  );
}
""",

    "src/app/layouts/MainLayout.tsx": """
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
""",

    "src/app/layouts/MainLayout.module.css": """
.container {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
}

.main {
  padding: 24px;
}
""",

    "src/components/layout/Sidebar.tsx": """
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ width: "240px", padding: "20px" }}>
      <h2>Pathway</h2>

      <nav style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        marginTop: "20px"
      }}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/meetings">Meetings</NavLink>
        <NavLink to="/strategies">Strategies</NavLink>
      </nav>
    </aside>
  );
}
""",

    "src/components/layout/Topbar.tsx": """
export default function Topbar() {
  return (
    <header
      style={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
      }}
    >
      Admin Panel
    </header>
  );
}
""",

    "src/pages/Dashboard/DashboardPage.tsx": """
export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}
""",

    "src/pages/Students/StudentsPage.tsx": """
export default function StudentsPage() {
  return <h1>Students</h1>;
}
""",

    "src/pages/StudentDetail/StudentDetailPage.tsx": """
import { useParams } from "react-router-dom";

export default function StudentDetailPage() {
  const { id } = useParams();

  return <h1>Student {id}</h1>;
}
""",

    "src/pages/Meetings/MeetingsPage.tsx": """
export default function MeetingsPage() {
  return <h1>Meetings</h1>;
}
""",

    "src/pages/MeetingDetail/MeetingDetailPage.tsx": """
import { useParams } from "react-router-dom";

export default function MeetingDetailPage() {
  const { id } = useParams();

  return <h1>Meeting {id}</h1>;
}
""",

    "src/pages/Strategies/StrategiesPage.tsx": """
export default function StrategiesPage() {
  return <h1>Strategies</h1>;
}
""",

    "src/styles/globals.css": """
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, sans-serif;
}
""",

    "src/styles/variables.css": """
:root {
  --primary: #2563eb;
  --background: #f8fafc;
  --surface: #ffffff;
  --text: #0f172a;
}
""",

    "src/services/api.ts": """
export const api = {};
""",

    "src/types/index.ts": """
export {};
""",
}

FOLDERS = [
    "src/components/dashboard",
    "src/components/students",
    "src/components/meetings",
    "src/components/strategies",
    "src/components/ui",
]

for folder in FOLDERS:
    Path(folder).mkdir(parents=True, exist_ok=True)

for path, content in FILES.items():
    file_path = Path(path)
    file_path.parent.mkdir(parents=True, exist_ok=True)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")

print("✅ Estructura React creada correctamente")