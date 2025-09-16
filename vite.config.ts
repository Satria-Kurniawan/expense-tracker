import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // Konfigurasi ini akan membuat file manifest.json
      manifest: {
        name: "Bye-Bye Money",
        short_name: "ByeMoney",
        description: "Deskripsi singkat tentang aplikasi PWA Anda.",
        theme_color: "#ffffff", // Warna tema untuk UI browser
        background_color: "#ffffff", // Warna untuk splash screen
        display: "standalone", // Membuat aplikasi terasa seperti aplikasi native
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png", // Path ke ikon di folder public
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png", // Path ke ikon di folder public
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Penting agar ikon pas di semua bentuk
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
