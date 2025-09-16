import React from "react"

// Perbarui tipe props dengan menambahkan 'balance'
interface MastercardProps {
  cardNumber: string
  cardholderName: string
  expiryDate: string
  balance: number // Tambahkan prop untuk saldo
}

const Mastercard: React.FC<MastercardProps> = ({
  cardNumber,
  cardholderName,
  expiryDate,
  balance,
}) => {
  // Fungsi untuk memformat angka ke format Rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="relative w-full h-48 rounded-xl p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Latar belakang dengan lingkaran semi-transparan */}
      <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl z-0"></div>
      <div className="absolute bottom-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl z-0"></div>

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Header Kartu: Chip, Saldo, dan Logo Mastercard */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            {/* Chip Kartu */}
            <div className="w-12 h-4 rounded-md bg-purple-400"></div>
            {/* Saldo Rupiah */}
            <div className="mt-2 text-sm font-light text-gray-400">Balance</div>
            <div className="text-xl font-bold">{formatRupiah(balance)}</div>
          </div>
          {/* Logo Mastercard */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-400 opacity-80"></div>
            <div className="w-10 h-10 rounded-full bg-purple-400 opacity-80 -ml-5"></div>
          </div>
        </div>

        {/* Nomor Kartu */}
        <div className="text-xl font-mono tracking-widest mt-4">
          {cardNumber}
        </div>

        {/* Info Pemilik & Tanggal Kadaluarsa */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <div className="text-xs font-light text-gray-400">Cardholder</div>
            <div className="text-sm font-medium uppercase">
              {cardholderName}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-light text-gray-400">Expires</div>
            <div className="text-sm font-medium">{expiryDate}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mastercard
