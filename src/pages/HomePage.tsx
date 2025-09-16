import Mastercard from "@/components/MasterCard"
import Transactions from "@/components/Transactions"
import { useAuth } from "@/hooks/useAuth"
import { getBalance } from "@/services/transactions"
import { useQuery } from "@tanstack/react-query"

export default function HomePage() {
  const { user } = useAuth()
  const {
    data,
    // isLoading,
    // isError,
  } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  })

  return (
    <main>
      <div>
        <Mastercard
          cardNumber="100801103"
          cardholderName={user?.name || ""}
          expiryDate="10/08/30"
          balance={data?.balance ?? 0}
        />
        <Transactions />
      </div>
    </main>
  )
}
