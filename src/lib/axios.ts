import axios, { AxiosError } from "axios"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // if (error.response?.status === 401) {
    //   setTimeout(() => {
    //     window.location.href = "/login"
    //   }, 3000)
    // }
    return Promise.reject(error)
  }
)

export default api
