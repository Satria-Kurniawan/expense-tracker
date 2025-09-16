"use client"

import { CardDescription, CardTitle } from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { Transaction } from "@/types"
import { TrendingDown, TrendingUp } from "lucide-react"
import { useMemo } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

export const description = "An area chart with a legend"

const chartConfig = {
  expense: {
    label: "Expense",
    color: "var(--chart-6)",
  },
  income: {
    label: "Income",
    color: "var(--chart-7)",
  },
} satisfies ChartConfig

export function ReportsChart({
  transactions,
}: {
  transactions: Transaction[] | undefined
}) {
  const chartData = useMemo(() => {
    if (!transactions) return []

    // group by month-year
    const grouped: Record<
      string,
      { month: string; expense: number; income: number; year: number }
    > = {}

    transactions.forEach((trx) => {
      if (!trx.date) return
      const d = new Date(trx.date)
      const month = d.toLocaleString("default", { month: "long" })
      const key = `${month}-${d.getFullYear()}`

      if (!grouped[key]) {
        grouped[key] = {
          month,
          year: d.getFullYear(),
          expense: 0,
          income: 0,
        }
      }

      if (trx.type === "expense") {
        grouped[key].expense += Number(trx.amount) || 0
      } else {
        grouped[key].income += Number(trx.amount) || 0
      }
    })

    // urutkan berdasarkan tahun + bulan
    return Object.values(grouped).sort((a, b) => {
      const dateA = new Date(`${a.month} 1, ${a.year}`).getTime()
      const dateB = new Date(`${b.month} 1, ${b.year}`).getTime()
      return dateA - dateB
    })
  }, [transactions])

  const trending = useMemo(() => {
    if (chartData.length < 2) return null

    const last = chartData[chartData.length - 1]
    const prev = chartData[chartData.length - 2]

    // contoh: growth berdasarkan total expense
    const lastTotal = last.expense
    const prevTotal = prev.expense

    if (prevTotal === 0) {
      return { month: last.month, value: "100.0", positive: true }
    }

    const growth = ((lastTotal - prevTotal) / prevTotal) * 100

    return {
      month: last.month,
      value: growth.toFixed(1),
      positive: growth >= 0,
    }
  }, [chartData])

  return (
    <div>
      <div className="mb-8">
        <CardTitle>Expense Tracker Chart</CardTitle>
        <CardDescription>
          Showing total expense and income per month
        </CardDescription>
      </div>

      <div className="mb-8">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {/* Income Area */}
            <Area
              dataKey="income"
              type="natural"
              fill="var(--color-income)"
              fillOpacity={0.4}
              stroke="var(--color-income)"
              stackId="1"
            />
            {/* Expense Area */}
            <Area
              dataKey="expense"
              type="natural"
              fill="var(--color-expense)"
              fillOpacity={0.4}
              stroke="var(--color-expense)"
              stackId="2"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>

      {trending && (
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending {trending.positive ? "up" : "down"} by {trending.value}%
              this month{" "}
              {trending.positive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>

            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {chartData[0].month} - {chartData[chartData.length - 1].month}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
