import React from "react"
import Typography from "./Typography"
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react"
import { formatRupiah } from "@/lib/utils"

interface SummaryCardsProps {
  income: number
  expense: number
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expense }) => {
  return (
    <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
      {/* Income Card */}
      <div className="p-6 rounded-xl border">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <Typography variant="body2" className="text-green-700 font-medium">
            Income
          </Typography>
          <div className="p-2 rounded-full bg-green-200">
            <ArrowUpCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <span className="font-bold tracking-tight">{formatRupiah(income)}</span>
      </div>

      {/* Expense Card */}
      <div className="p-6 rounded-xl border">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <Typography variant="body2" className="text-red-700 font-medium">
            Expense
          </Typography>
          <div className="p-2 rounded-full bg-red-200">
            <ArrowDownCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <span className="font-bold tracking-tight">
          {formatRupiah(expense)}
        </span>
      </div>
    </div>
  )
}

export default SummaryCards
