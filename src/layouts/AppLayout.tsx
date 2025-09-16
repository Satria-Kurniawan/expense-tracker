import FloatingNavBar from "@/components/FloatingNavBar"
import { Outlet } from "react-router"

export default function AppLayout() {
  return (
    <div className="m-5 flex justify-center items-center">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
      <FloatingNavBar />
    </div>
  )
}
