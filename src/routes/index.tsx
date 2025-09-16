import ProtectedRoute from "@/components/ProtectedRoute"
import AppLayout from "@/layouts/AppLayout"
import { RootLayout } from "@/layouts/RootLayout"
import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import HomePage from "@/pages/HomePage"
import ProfilePage from "@/pages/ProfilePage"
import ReportsPage from "@/pages/ReportsPage"
import SearchPage from "@/pages/SearchPage"
import { createBrowserRouter } from "react-router"

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: "/",
                element: <HomePage />,
              },
              {
                path: "/search",
                element: <SearchPage />,
              },
              {
                path: "/reports",
                element: <ReportsPage />,
              },
              {
                path: "/profile",
                element: <ProfilePage />,
              },
            ],
          },
        ],
      },
    ],
  },
])
