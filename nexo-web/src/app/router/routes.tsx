import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardPage from "../../pages/Dashboard/DashboardPage";
import StudentsPage from "../../pages/Students/StudentsPage";
import StudentDetailPage from "../../pages/StudentDetail/StudentDetailPage";
import MeetingsPage from "../../pages/Meetings/MeetingsPage";
import MeetingDetailPage from "../../pages/MeetingDetail/MeetingDetailPage";
import StrategiesPage from "../../pages/Strategies/StrategiesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "students",
        element: <StudentsPage />,
      },
      {
        path: "students/:id",
        element: <StudentDetailPage />,
      },
      {
        path: "meetings",
        element: <MeetingsPage />,
      },
      {
        path: "meetings/:id",
        element: <MeetingDetailPage />,
      },
      {
        path: "strategies",
        element: <StrategiesPage />,
      },
    ],
  },
]);