import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"
import { useState, type FormEvent } from "react"
import { toast } from "sonner"

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()

    toast.promise(login({ email, password }), {
      loading: "Mencoba untuk login...",
      success: "Login berhasil! Mengarahkan...",
      error: "Login Gagal! Email atau password salah.",
    })
  }

  return (
    <main className="m-5 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Masukkan email Anda di bawah ini untuk login ke akun Anda
          </CardDescription>
        </div>

        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email} // 4. Hubungkan dengan state
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Lupa password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="mt-8 w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Memproses..." : "Login"}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <a href="#" className="underline">
            Daftar
          </a>
        </div>
      </div>
    </main>
  )
}
