// src/components/SwipeableCard.tsx

import { motion } from "framer-motion"
import { Pencil, Trash2 } from "lucide-react"

// Tentukan props yang dibutuhkan oleh komponen ini
interface SwipeableCardProps {
  children: React.ReactNode
  onEdit: () => void
  onDelete: () => void
}

export function SwipeableCard({
  children,
  onEdit,
  onDelete,
}: SwipeableCardProps) {
  // Lebar total dari tombol aksi (misal: 64px per tombol)
  const actionWidth = 128

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Wadah untuk Tombol Aksi (di belakang) */}
      <div className="absolute top-0 right-0 flex h-full">
        <button
          onClick={onEdit}
          className="flex items-center justify-center w-16 h-full border"
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center w-16 h-full border bg-destructive text-white rounded-r-lg"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* 2. Konten yang Bisa Digeser (di depan) */}
      <motion.div
        drag="x" // Mengaktifkan geser horizontal
        dragConstraints={{ right: 0, left: -actionWidth }} // Batasan geser
        className="relative w-full bg-background z-10" // Pastikan bg dan z-index ada
      >
        {children}
      </motion.div>
    </div>
  )
}
