import { useAuth } from "@/hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import Loader from "./Loader"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <Loader />

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
