import Header from "@/components/Header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { LogOut, Settings, Share, ShieldCheck } from "lucide-react"

// Data dummy baru yang relevan dengan expense tracker
const stats = [
  { value: "$1,204.50", label: "This Month" },
  { value: "82", label: "Transactions" },
  { value: "Sep 2024", label: "Joined" },
]

export default function ProfilePage() {
  // 2. Ambil data user dan fungsi logout
  const { user, logout } = useAuth()

  // Helper untuk mendapatkan inisial nama
  const getInitials = (name?: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || ".."
    )
  }

  return (
    <main className="pb-8">
      <Header
        title="Reports"
        withBackButton
        actionButton={
          <Button variant={"secondary"} size={"icon"} rounded={"full"}>
            <Share />
          </Button>
        }
      />
      <div className="px-4 py-6">
        {/* Bagian Header Profil */}
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src={user?.avatar_url} alt={user?.name} />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h1 className="text-2xl font-bold">{user?.name || "User Name"}</h1>
            <p className="text-muted-foreground">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-6 flex justify-center gap-2">
          <Button>Edit Profile</Button>
          {/* 3. Tambahkan tombol logout fungsional */}
          <Button variant="ghost" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Bagian Statistik */}
        <div className="my-8 flex justify-around rounded-lg border bg-card p-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bagian Konten dengan Tabs */}
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <TabsContent value="settings" className="mt-4">
            <PlaceholderContent
              icon={<Settings className="h-10 w-10 text-muted-foreground" />}
              title="App Settings"
              description="Manage your notification preferences, currency, and theme."
            />
          </TabsContent>
          <TabsContent value="security" className="mt-4">
            <PlaceholderContent
              icon={<ShieldCheck className="h-10 w-10 text-muted-foreground" />}
              title="Account Security"
              description="Change your password and manage two-factor authentication."
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

// Komponen placeholder yang dimodifikasi untuk menerima ikon
function PlaceholderContent({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-4 p-10 text-center">
        {icon}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
