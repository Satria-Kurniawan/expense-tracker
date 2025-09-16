export interface Transaction {
  id?: string | undefined
  category: string
  name: string
  amount: string | number
  date: Date | undefined
  type: "" | "income" | "expense"
}

export type FilterType = "today" | "week" | "month" | "year" | "custom"

export interface PageLink {
  url: string | null
  label: string
  active: boolean
}

// Tipe generik untuk semua response paginasi dari Laravel
export interface PaginatedResponse<T> {
  current_page: number
  data: T[] // 'data' akan berisi array dari tipe yang Anda tentukan
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: PageLink[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}
