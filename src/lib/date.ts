// src/lib/date.ts

type DateInput = Date | string | number | null | undefined

/**
 * Opsi untuk memformat tanggal menggunakan Intl.DateTimeFormat.
 */
interface FormatDateOptions {
  /** Locale yang akan digunakan, contoh: "id-ID", "en-US". Default "id-ID". */
  locale?: string
  /** Pilihan format preset: 'short', 'medium', atau 'long'. Default 'long'. */
  format?: "short" | "medium" | "long"
  /** Menampilkan nama hari (contoh: "Kamis"). Default false. */
  withWeekday?: boolean
  /** Opsi format kustom dari Intl.DateTimeFormatOptions untuk menimpa preset. */
  formatOptions?: Intl.DateTimeFormatOptions
}

/**
 * Fungsi untuk memformat tanggal menggunakan Intl API bawaan browser.
 * Tidak memerlukan library eksternal.
 *
 * Contoh penggunaan:
 * formatDate(new Date()) // "4 September 2025" (long)
 * formatDate(new Date(), { format: 'medium' }) // "4 Sep 2025" (medium)
 * formatDate(new Date(), { format: 'short' }) // "04/09/2025" (short)
 * formatDate(new Date(), { withWeekday: true }) // "Kamis, 4 September 2025"
 * formatDate(new Date(), { format: 'medium', withWeekday: true }) // "Kamis, 4 Sep 2025"
 *
 * @param date - Input tanggal (bisa berupa object Date, string, atau timestamp).
 * @param options - Opsi formatting, termasuk locale dan pilihan format preset.
 * @returns String tanggal yang sudah diformat atau string kosong jika input tidak valid.
 */
export function formatDate(
  date: DateInput,
  options: FormatDateOptions = {}
): string {
  // Atur nilai default jika tidak disediakan
  const {
    locale = "id-ID", // Default ke Bahasa Indonesia
    format = "long", // Default ke format "long"
    withWeekday = false, // Default untuk tidak menampilkan nama hari
    formatOptions: customFormatOptions,
  } = options

  if (!date) {
    return "" // Kembalikan string kosong untuk input null atau undefined
  }

  try {
    const dateObject = new Date(date)

    // Periksa apakah tanggal yang dibuat valid
    if (isNaN(dateObject.getTime())) {
      throw new Error("Invalid date provided")
    }

    let formatOptions: Intl.DateTimeFormatOptions

    // Tentukan opsi format berdasarkan preset yang dipilih
    switch (format) {
      case "short":
        formatOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
        break
      case "medium":
        formatOptions = {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
        break
      case "long":
      default:
        formatOptions = {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
        break
    }

    // Tambahkan nama hari jika opsi withWeekday bernilai true
    if (withWeekday) {
      formatOptions.weekday = "long"
    }

    // Gabungkan preset dengan opsi kustom jika ada,
    // opsi kustom akan menimpa preset.
    const finalFormatOptions = { ...formatOptions, ...customFormatOptions }

    // Buat formatter dan format tanggalnya
    return new Intl.DateTimeFormat(locale, finalFormatOptions).format(
      dateObject
    )
  } catch (error) {
    console.error("Error formatting date with Intl API:", error)
    return "Tanggal tidak valid"
  }
}

export const formatDateForApi = (d?: Date | null): string | null => {
  if (!d) return null
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}` // "2025-09-16"
}
