import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatRupiah } from "@/lib/utils"
import { getTransactions } from "@/services/transactions"
import type { FilterType, Transaction } from "@/types"
import { useQuery } from "@tanstack/react-query"
import {
  Briefcase,
  Gift,
  HelpCircle,
  Music,
  ShoppingCart,
  Utensils,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import FormTransaction from "./FormTransaction"
import { SwipeableCard } from "./SwipeableCard"
import Typography from "./Typography"
import { Badge } from "./ui/badge"

// const transactions: Transaction[] = [
//   {
//     id: "txn_1",
//     name: "Langganan Spotify",
//     category: "Hiburan",
//     date: new Date(),
//     amount: 54900,
//     type: "expense",
//   },
//   {
//     id: "txn_2",
//     name: "Gaji Bulanan",
//     category: "Pekerjaan",
//     date: new Date("2025-08-25"),
//     amount: 8500000,
//     type: "income",
//   },
//   {
//     id: "txn_3",
//     name: "Makan Siang",
//     category: "Makanan",
//     date: new Date("2025-09-02"),
//     amount: 25000,
//     type: "expense",
//   },
//   {
//     id: "txn_4",
//     name: "Belanja Bulanan",
//     category: "Kebutuhan",
//     date: new Date("2025-07-22"),
//     amount: 750000,
//     type: "expense",
//   },
//   {
//     id: "txn_5",
//     name: "Bonus Proyek",
//     category: "Pekerjaan",
//     date: new Date("2025-06-20"),
//     amount: 1200000,
//     type: "income",
//   },
// ]

const categoryIcons: Record<string, React.ElementType> = {
  Hiburan: Music,
  Pekerjaan: Briefcase,
  Makanan: Utensils,
  Kebutuhan: ShoppingCart,
  Bonus: Gift,
}

function getCategoryIcon(category: string) {
  return categoryIcons[category] || HelpCircle
}

interface TransactionsProps {
  dateFilter?: Date | undefined
  clearDateFilter?: () => void
  searchQuery?: string
}
export default function Transactions({
  dateFilter,
  clearDateFilter,
  searchQuery,
}: TransactionsProps) {
  const [filter, setFilter] = useState<FilterType>("today")
  const [openForm, setOpenForm] = useState(false)
  const [formAction, setFormAction] = useState<"CREATE" | "UPDATE" | "DELETE">(
    "CREATE"
  )
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)

  const {
    data: transactions,
    // isLoading,
    // isError,
  } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  })

  const filteredTransactions = useMemo(() => {
    if (!transactions) return []

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const filtered = transactions.filter((trx) => {
      if (!trx.date) return false

      const trxDate = new Date(trx.date)
      trxDate.setHours(0, 0, 0, 0)

      switch (filter) {
        case "today": {
          return trxDate.getTime() === today.getTime()
        }
        case "week": {
          const firstDayOfWeek = new Date(today)
          firstDayOfWeek.setDate(today.getDate() - today.getDay())

          const lastDayOfWeek = new Date(firstDayOfWeek)
          lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)

          return trxDate >= firstDayOfWeek && trxDate <= lastDayOfWeek
        }
        case "month": {
          return (
            trxDate.getMonth() === today.getMonth() &&
            trxDate.getFullYear() === today.getFullYear()
          )
        }
        case "year": {
          return trxDate.getFullYear() === today.getFullYear()
        }
        case "custom": {
          if (!dateFilter) return true
          const selected = new Date(dateFilter)
          selected.setHours(0, 0, 0, 0)
          return trxDate.getTime() === selected.getTime()
        }
        default:
          return true
      }
    })

    // 🔍 Filter tambahan untuk searchQuery
    if (searchQuery?.trim() !== "") {
      const lowerQuery = searchQuery?.toLowerCase() || ""
      return filtered.filter(
        (trx) =>
          trx.name.toLowerCase().includes(lowerQuery) ||
          trx.category.toLowerCase().includes(lowerQuery) ||
          trx.type.toLowerCase().includes(lowerQuery)
      )
    }

    return filtered
  }, [transactions, filter, dateFilter, searchQuery])

  useEffect(() => {
    if (dateFilter) setFilter("custom")
  }, [dateFilter])

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setOpenForm(true)
    setFormAction("UPDATE")
  }
  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setOpenForm(true)
    setFormAction("DELETE")
  }

  return (
    <div className="h-[65vh] overflow-auto">
      <Typography variant="h3" className="my-5 font-bold text-2xl">
        Transactions
      </Typography>

      <div className="flex justify-center">
        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as FilterType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="today"
              onClick={() => clearDateFilter && clearDateFilter()}
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="week"
              onClick={() => clearDateFilter && clearDateFilter()}
            >
              This Week
            </TabsTrigger>
            <TabsTrigger
              value="month"
              onClick={() => clearDateFilter && clearDateFilter()}
            >
              This Month
            </TabsTrigger>
            <TabsTrigger
              value="year"
              onClick={() => clearDateFilter && clearDateFilter()}
            >
              This Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <section className="mt-6 flex flex-col gap-y-3">
        {filteredTransactions.map((trx: Transaction) => {
          const Icon = getCategoryIcon(trx.category)

          return (
            <SwipeableCard
              key={trx.id}
              onEdit={() => handleEdit(trx)}
              onDelete={() => handleDelete(trx)}
            >
              <div>
                <div className="flex gap-6 p-2">
                  <div className="p-5 rounded-xl bg-secondary">
                    <Icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <h1 className="font-bold">{trx.name}</h1>
                      <p>{trx.category}</p>
                    </div>
                    <div className="grid">
                      <h1 className="font-bold text-xl">
                        {formatRupiah(Number(trx.amount))}
                      </h1>
                      <Badge
                        variant={
                          trx.type == "expense" ? "default" : "secondary"
                        }
                        className="ml-auto"
                      >
                        {trx.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </SwipeableCard>
          )
        })}
      </section>

      <FormTransaction
        open={openForm}
        setOpen={setOpenForm}
        initialData={selectedTransaction}
        action={formAction}
      />
    </div>
  )
}
