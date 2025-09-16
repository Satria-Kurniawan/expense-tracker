import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { categories } from "@/constants"
import { formatDate } from "@/lib/date"
import { cn } from "@/lib/utils"
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from "@/services/transactions"
import type { Transaction } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CheckIcon, ChevronsUpDownIcon, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Checkbox } from "./ui/checkbox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

interface FormTransactionProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  initialData: Transaction | null // Terima prop baru
  action: "CREATE" | "UPDATE" | "DELETE"
}

const EMPTY_FORM: Transaction = {
  category: "",
  name: "",
  amount: "",
  date: new Date(),
  type: "",
}

export default function FormTransaction({
  open,
  setOpen,
  initialData,
  action,
}: FormTransactionProps) {
  const [openCategory, setOpenCategory] = useState(false)
  const [form, setForm] = useState<Transaction>({
    id: "",
    category: "",
    name: "",
    amount: "",
    date: new Date() as Date | undefined,
    type: "",
  })

  useEffect(() => {
    if (initialData) setForm(initialData)
    else setForm(EMPTY_FORM)
  }, [initialData, open])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn:
      action === "CREATE"
        ? createTransaction
        : action === "UPDATE"
        ? updateTransaction
        : deleteTransaction,
    onSuccess: (data) => {
      setForm(EMPTY_FORM)
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ["transactions"] })

      const toastMessages = {
        CREATE: { title: "Transaksi berhasil dibuat 🎉" },
        UPDATE: { title: "Transaksi berhasil diperbarui ✅" },
        DELETE: { title: "Transaksi berhasil dihapus 🗑️" },
      }

      toast(toastMessages[action].title, {
        description: `Transaksi "${data?.data?.name}" telah diproses.`,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo action triggered!"),
        },
      })
    },
    onError: (error) => {
      toast("Terjadi Kesalahan", {
        description: error.message || `Gagal ${action.toLowerCase()} data.`,
      })
    },
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate({ ...form })
  }

  if (action === "DELETE") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => setOpen(false)}
                disabled={mutation.isPending}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant={"destructive"}
                className="flex-1"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  "Hapus"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Transaksi</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Pilih Kategori</Label>
            <Popover open={openCategory} onOpenChange={setOpenCategory}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCategory}
                  className="justify-between"
                >
                  {form.category
                    ? categories.find(
                        (category) => category.value === form.category
                      )?.label
                    : "Pilih kategori..."}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Search category..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.value}
                          value={category.value}
                          onSelect={(currentValue) => {
                            setForm((prev) => ({
                              ...prev,
                              category:
                                currentValue === prev.category
                                  ? ""
                                  : currentValue,
                            }))
                            setOpenCategory(false)
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              form.category === category.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Nama Transaksi</Label>
            <Input
              required
              id="name"
              name="name"
              placeholder="Ketik nama transaksi"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amount">Jumlah Transaksi</Label>
            <Input
              required
              id="amount"
              name="amount"
              placeholder="Ketik jumlah transaksi"
              value={form.amount}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="date">Tanggal Transaksi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"}>
                  {form.date
                    ? `${formatDate(form.date)}`
                    : "Pilih Tanggal Transaksi"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  captionLayout="dropdown"
                  selected={form.date}
                  onSelect={(date) => {
                    setForm((prev) => ({ ...prev, date: date }))
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="amount">Jenis Transaksi</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="expense"
                  checked={form.type === "expense"}
                  onCheckedChange={(checked) => {
                    setForm((prev) => ({
                      ...prev,
                      type: checked ? "expense" : "",
                    }))
                  }}
                />
                <Label htmlFor="expense">Expense</Label>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="income"
                  checked={form.type === "income"}
                  onCheckedChange={(checked) => {
                    setForm((prev) => ({
                      ...prev,
                      type: checked ? "income" : "",
                    }))
                  }}
                />
                <Label htmlFor="income">Income</Label>
              </div>
            </div>
          </div>
          <br />
          <div className="flex gap-3">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => setOpen(false)}
              disabled={mutation.isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant={"default"}
              className="flex-1"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
