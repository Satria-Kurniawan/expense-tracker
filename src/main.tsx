import {
  MutationCache, // <-- Import
  QueryCache, // <-- Import
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import axios from "axios"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"
import "./index.css"
import { router } from "./routes"

const queryClient = new QueryClient({
  // Global error handler untuk SEMUA query (misalnya, useQuery)
  queryCache: new QueryCache({
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Jika ada error 401 dari query manapun, bersihkan state user.
        // Ini akan melogout pengguna secara state.
        queryClient.setQueryData(["user"], null)
      }
    },
  }),
  // Global error handler untuk SEMUA mutasi (misalnya, useMutation)
  mutationCache: new MutationCache({
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Lakukan hal yang sama jika error terjadi saat mutasi data.
        queryClient.setQueryData(["user"], null)
      }
    },
  }),
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
