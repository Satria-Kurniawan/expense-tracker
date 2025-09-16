"use client"

import { cn } from "@/lib/utils"
import { BarChart, Home, Plus, Search, User } from "lucide-react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import FormTransaction from "./FormTransaction"

const navItems = [
  { icon: Home, label: "Home", id: "home", path: "/" },
  { icon: Search, label: "Search", id: "search", path: "/search" },
  { icon: Plus, label: "Add", id: "add", isCenter: true },
  { icon: BarChart, label: "Reports", id: "reports", path: "/reports" },
  { icon: User, label: "Profile", id: "profile", path: "/profile" },
]

export default function FloatingNavBar() {
  const [activeItem, setActiveItem] = useState("home")
  const [openForm, setOpenForm] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card/80 backdrop-blur-lg border border-border rounded-2xl shadow-lg px-6 py-3">
        <div className="flex items-center justify-center space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isCenter = item.isCenter
            const isActive = isCenter
              ? activeItem === item.id
              : location.pathname === item.path

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveItem(item.id)
                  if (isCenter) setOpenForm(true)
                  if (item.path) navigate(item.path)
                }}
                className={cn(
                  "relative flex flex-col items-center justify-center transition-all duration-300 ease-out group",
                  isCenter
                    ? "w-14 h-14 rounded-full shadow-lg"
                    : "w-12 h-12 rounded-xl",
                  isActive && !isCenter && "bg-primary/10",
                  isCenter &&
                    "bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 hover:scale-110",
                  !isCenter && "hover:bg-accent/50 hover:scale-105"
                )}
              >
                {isCenter && (
                  <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                )}

                {isActive && !isCenter && (
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
                )}

                {/* Icon */}
                <Icon
                  className={cn(
                    "transition-all duration-300 ease-out relative z-10",
                    isCenter ? "w-6 h-6 text-primary-foreground" : "w-5 h-5",
                    isActive && !isCenter
                      ? "text-primary scale-110"
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                />

                {/* Ripple effect */}
                <div
                  className={cn(
                    "absolute inset-0 bg-primary/20 scale-0 group-active:scale-100 transition-transform duration-150 ease-out",
                    isCenter ? "rounded-full" : "rounded-xl"
                  )}
                />

                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex justify-center mt-2 space-x-1">
          {navItems
            .filter((item) => !item.isCenter)
            .map((item) => (
              <div
                key={`dot-${item.id}`}
                className={cn(
                  "w-1 h-1 rounded-full transition-all duration-300",
                  activeItem === item.id
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                )}
              />
            ))}
        </div>
      </div>
      <FormTransaction
        open={openForm}
        setOpen={setOpenForm}
        initialData={null}
        action="CREATE"
      />
    </div>
  )
}
