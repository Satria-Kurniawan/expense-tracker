import React from "react"

// Definisikan tipe untuk varian tipografi yang tersedia
type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body1"
  | "body2"
  | "caption"

// Definisikan tipe untuk tag HTML semantik
type TypographyTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"

interface TypographyProps {
  /** Varian tipografi yang menentukan gaya (ukuran, berat, dll.) */
  variant: TypographyVariant
  /** Konten teks atau elemen lain yang akan ditampilkan */
  children: React.ReactNode
  /** Tag HTML yang digunakan untuk rendering (opsional, defaultnya berdasarkan varian) */
  as?: TypographyTag
  /** Kelas CSS tambahan untuk styling (opsional) */
  className?: string
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  as,
  className,
}) => {
  // Objek yang memetakan varian ke kelas Tailwind CSS yang sesuai
  const styles = {
    h1: "text-3xl lg:text-4xl font-bold text-gray-900",
    h2: "text-2xl lg:text-3xl font-bold text-gray-800",
    h3: "text-xl lg:text-2xl font-bold text-gray-700",
    h4: "text-lg lg:text-xl font-semibold text-gray-700",
    h5: "text-base lg:text-lg font-semibold text-gray-700",
    h6: "text-sm lg:text-base font-semibold text-gray-700",
    body1: "text-base text-gray-700",
    body2: "text-sm text-gray-600",
    caption: "text-xs italic text-gray-500",
  }

  // Menentukan tag HTML default berdasarkan varian
  const defaultTag: TypographyTag = variant.startsWith("h")
    ? (variant as TypographyTag)
    : variant === "caption"
    ? "span"
    : "p"

  // Memilih tag yang akan dirender (menggunakan 'as' jika ada, jika tidak, gunakan default)
  const ComponentTag = as || defaultTag

  // Menggabungkan gaya default dengan kelas kustom
  const combinedClasses = `${styles[variant]} ${className || ""}`

  return <ComponentTag className={combinedClasses}>{children}</ComponentTag>
}

export default Typography
