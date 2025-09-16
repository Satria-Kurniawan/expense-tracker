import Header from "@/components/Header"
import Transactions from "@/components/Transactions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "@/lib/date"
import { CalendarDays, LucideX, Search, Share } from "lucide-react"
import { useState } from "react"

export default function SearchPage() {
  const [filter, setFilter] = useState<{
    date: Date | undefined
    searchQuery: string
  }>({
    date: undefined,
    searchQuery: "",
  })

  return (
    <main>
      <Header
        title="Search"
        withBackButton
        actionButton={
          <Button variant={"secondary"} size={"icon"} rounded={"full"}>
            <Share />
          </Button>
        }
      />
      <section className="flex gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={filter.date ? "default" : "outline"} size={"icon"}>
              <CalendarDays />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={filter.date}
              onSelect={(selectedDate) => {
                setFilter((prev) => ({
                  ...prev,
                  date: selectedDate ?? new Date(),
                }))
              }}
              className="w-full max-w-sm rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>

        {filter.date && (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setFilter((prev) => ({ ...prev, date: undefined }))}
          >
            <LucideX />
          </Button>
        )}

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search..."
              value={filter.searchQuery}
              onChange={(event) =>
                setFilter((prev) => ({
                  ...prev,
                  searchQuery: event.target.value,
                }))
              }
            />
            <Button>
              <Search />
            </Button>
          </div>
        </div>
      </section>

      <div className="my-3">
        {filter.date && (
          <Badge variant={"outline"}>{formatDate(filter.date)}</Badge>
        )}
      </div>

      <section>
        <Transactions
          dateFilter={filter.date}
          clearDateFilter={() =>
            setFilter((prev) => ({ ...prev, date: undefined }))
          }
          searchQuery={filter.searchQuery}
        />
      </section>
    </main>
  )
}
