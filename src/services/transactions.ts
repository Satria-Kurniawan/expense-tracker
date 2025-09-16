import api from "@/lib/axios"
import { formatDateForApi } from "@/lib/date"
import type { FilterType, Transaction } from "@/types"

export const createTransaction = async ({
  category,
  name,
  amount,
  date,
  type,
}: Transaction) => {
  const response = await api.post("/api/transactions", {
    category,
    name,
    amount,
    date: formatDateForApi(date),
    type,
  })

  return response.data
}

export const updateTransaction = async ({
  id,
  category,
  name,
  amount,
  date,
  type,
}: Transaction) => {
  const response = await api.patch(`/api/transactions/${id}`, {
    category,
    name,
    amount,
    date: formatDateForApi(date),
    type,
  })

  return response.data
}

export const deleteTransaction = async ({ id }: Transaction) => {
  const response = await api.delete(`/api/transactions/${id}`)

  return response.data
}

export const getTransactions = async () => {
  const response = await api.get("/api/transactions")
  return response.data
}

export const getBalance = async () => {
  const response = await api.get("/api/balance")
  return response.data
}

export const getExpense = async (filter?: FilterType) => {
  const response = await api.get("/api/expense", {
    params: { filter },
  })
  return response.data
}
