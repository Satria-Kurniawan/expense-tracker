import { AuthContext } from "@/contexts/AuthContext"
import { useAuth } from "@/hooks/useAuth"
import { type ReactNode } from "react"

// Komponen Provider sekarang menjadi satu-satunya ekspor dari file ini
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
