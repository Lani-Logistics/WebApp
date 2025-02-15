import { Plus } from "lucide-react";
import { formatNumber } from "@/Utils/formatNumber";
import { useAuth } from "@/Hooks";
import { Link } from "react-router-dom";
const WalletBanner = () => {
    const {userData} = useAuth()
  return (
    <><div className="bg-gradient-to-br from-orange-800 to-primary text-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div>
                    <p className="text-xs font-sans font-medium">Wallet Balance</p>
                    <p className="text-lg font-sora font-bold">{formatNumber(Number(userData?.wallet))}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Link to="/wallet" className="bg-white center gap-1 font-sora font-medium text-primary text-sm px-4 py-2 rounded-sm">
                    <span>Fund</span>
                    <Plus size={18} />
                </Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default WalletBanner