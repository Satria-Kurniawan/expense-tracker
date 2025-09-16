import type { useAuth } from "@/hooks/useAuth" // Import 'type' untuk efisiensi
import { createContext, useContext } from "react"

// Tentukan tipe untuk nilai context berdasarkan return type dari useAuth
type AuthContextType = ReturnType<typeof useAuth>

// Buat context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Buat dan ekspor hook untuk menggunakan context
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
