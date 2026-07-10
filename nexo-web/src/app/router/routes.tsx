// src/app/router/routes.tsx

import { createBrowserRouter } from "react-router-dom";

import OrganizationCheckPage
  from "../../pages/Organizations/components/OrganizationCheckPage";

import CreateOrganizationPage
  from "../../pages/Organizations/components/CreateOrganizationPage";
import MainLayout from "../layouts/MainLayout";

import { ProtectedRoute } from "./ProtectedRoute";

import AuthPage from "../../pages/auth/AuthPage";

import DashboardPage from "../../pages/Dashboard/DashboardPage";

import StudentsPage from "../../pages/Students/StudentsPage";

import StudentDetailPage from "../../pages/StudentDetail/StudentDetailPage";

import MeetingsPage from "../../pages/Meetings/MeetingsPage";

import MeetingDetailPage from "../../pages/MeetingDetail/MeetingDetailPage";

import StrategiesPage from "../../pages/Strategies/StrategiesPage";

import LogoutPage from "../../pages/LogoutPage";
import OrganizationsPage from "../../pages/Organizations/OrganizationPage/OrganizationsPage";
import VerifyEmailPage from "../../pages/auth/VerifyEmail";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/auth/verify-email",
    element: <VerifyEmailPage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/organization-check",
        element: <OrganizationCheckPage />,
      },

      {
        path: "/organizations/create",
        element: <CreateOrganizationPage />,
      },

      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "logout",
            element: <LogoutPage />,
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
          {
            path: "organizations",
            element: <OrganizationsPage />,
          },
        ],
      },
    ],
  },
]);