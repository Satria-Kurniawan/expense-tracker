import api from "@/lib/axios"
import {
  type LoginCredentials,
  type RegisterData,
  type User,
} from "@/types/auth"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router"

// --- Fungsi-fungsi API ---

// Fungsi untuk mengambil data user jika sudah login (cookie valid)
const fetchUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>("/api/auth/profile")
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // Jika error 401, berarti user belum login
      return null
    }
    throw error // Lemparkan error lain
  }
}

// Fungsi untuk request login
const loginRequest = async (credentials: LoginCredentials): Promise<User> => {
  const response = await api.post<User>("/api/auth/login", credentials)
  return response.data
}

// Fungsi untuk request register
const registerRequest = async (data: RegisterData): Promise<User> => {
  const response = await api.post<User>("/api/auth/register", data)
  return response.data
}

// Fungsi untuk request logout
const logoutRequest = async () => {
  const response = await api.post("/api/auth/logout")
  return response.data
}

// --- Hook Utama ---

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // 1. QUERY: Untuk mengecek status login saat aplikasi dimuat
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false, // Jangan coba ulang jika gagal (401)
    refetchOnWindowFocus: false, // Opsional: matikan refetch saat window focus
  })

  // 2. MUTATION: Untuk proses login
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: async () => {
      // Setelah login berhasil, ambil ulang data user dari backend
      const loggedInUser = await fetchUser()
      queryClient.setQueryData(["user"], loggedInUser)
      navigate("/")
    },
    onError: (error: AxiosError) => {
      console.error("Login failed:", error.response?.data)
    },
  })

  // 3. MUTATION: Untuk proses register
  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: (newUser) => {
      // Backend mungkin otomatis login setelah register, jadi kita update data user
      queryClient.setQueryData(["user"], newUser)
      navigate("/")
    },
    onError: (error: AxiosError) => {
      console.error("Registration failed:", error.response?.data)
    },
  })

  // 4. MUTATION: Untuk proses logout
  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      // Hapus data 'user' dari cache
      queryClient.setQueryData(["user"], null)
      // Anda bisa juga menghapus semua query lain jika perlu
      // queryClient.clear();
      navigate("/login") // Arahkan ke halaman login
    },
  })

  const isAuthenticated = !!user

  return {
    user, // Data user atau null
    isAuthenticated,
    isLoading, // Status loading pengecekan awal
    isError, // Status error pengecekan awal
    login: loginMutation.mutateAsync, // Fungsi login (async)
    isLoggingIn: loginMutation.isPending, // Status loading login
    register: registerMutation.mutateAsync, // Fungsi register (async)
    isRegistering: registerMutation.isPending, // Status loading register
    logout: logoutMutation.mutate, // Fungsi logout (sync)
    isLoggingOut: logoutMutation.isPending, // Status loading logout
  }
}
