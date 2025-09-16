import Header from "@/components/Header"
import { ReportsChart } from "@/components/ReportsChart"
import Typography from "@/components/Typography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/date"
import { formatRupiah } from "@/lib/utils"
import { getExpense, getTransactions } from "@/services/transactions"
import type { Transaction } from "@/types"
import { useQuery } from "@tanstack/react-query"
import {
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  parseISO,
} from "date-fns"
import { Share } from "lucide-react"
import { useMemo, useState } from "react"

export default function ReportsPage() {
  const [filter, setFilter] = useState<"today" | "week" | "month" | "year">(
    "year"
  )

  const { data: transactions } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  })

  const { data, isPending: isPendingExpense } = useQuery({
    queryKey: ["expense", filter],
    queryFn: () => getExpense(filter),
  })

  // Filter transactions sesuai tab
  const filteredTransactions = useMemo(() => {
    if (!transactions) return []
    return transactions.filter((txn) => {
      if (!txn.date) return false // skip jika date kosong/undefined

      const date = typeof txn.date === "string" ? parseISO(txn.date) : txn.date
      switch (filter) {
        case "today":
          return isToday(date)
        case "week":
          return isThisWeek(date, { weekStartsOn: 1 })
        case "month":
          return isThisMonth(date)
        case "year":
          return isThisYear(date)
        default:
          return true
      }
    })
  }, [transactions, filter])

  return (
    <main>
      <Header
        title="Reports"
        withBackButton
        actionButton={
          <Button variant={"secondary"} size={"icon"} rounded={"full"}>
            <Share />
          </Button>
        }
      />
      <div className="mb-8 text-center">
        <Badge variant={"outline"} className="mb-3">
          Total Expense
        </Badge>
        <Typography variant="h2">
          {isPendingExpense ? "Loading..." : formatRupiah(data?.total_expense)}
        </Typography>
        <ReportDate filter={filter} />
      </div>

      <div className="mb-8 flex justify-center">
        <Tabs
          defaultValue="today"
          value={filter}
          onValueChange={(val) => setFilter(val as typeof filter)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
            <TabsTrigger value="year">This Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <section>
        <ReportsChart transactions={filteredTransactions} />
      </section>
    </main>
  )
}

function ReportDate({
  filter,
}: {
  filter: "today" | "week" | "month" | "year"
}) {
  const now = new Date()

  let text = ""
  switch (filter) {
    case "today":
      text = formatDate(now, { format: "long" }) // e.g., September 15, 2025
      break
    case "week": {
      const start = new Date(now)
      start.setDate(now.getDate() - now.getDay()) // Sunday
      const end = new Date(start)
      end.setDate(start.getDate() + 6) // Saturday
      text = `${formatDate(start, { format: "medium" })} - ${formatDate(end, {
        format: "medium",
      })}`
      break
    }
    case "month":
      text = `${now.toLocaleString("default", {
        month: "long",
        year: "numeric",
      })} • Monthly Report` // e.g., September 2025 • Monthly Report
      break
    case "year":
      text = `${now.getFullYear()} • Annual Report` // e.g., 2025 • Annual Report
      break
  }

  return <Typography variant="body1">{text}</Typography>
}
