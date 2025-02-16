import {  Wallet } from "lucide-react";
import { formatNumber } from "@/Utils/formatNumber";
import { useAuth } from "@/Hooks";
import { Link, useLocation } from "react-router-dom";
const WalletBanner = () => {
    const {userData} = useAuth()
    const location = useLocation()
    const isWallet = location.pathname === "/wallet"
  return (
    <><div className="bg-gradient-to-br from-orange-800 to-primary text-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div>
                    <p className="text-xs font-sans font-medium">{isWallet ? "Total Balance" : "Wallet Balance"}</p>
                    <p className="text-lg font-sora font-bold">{formatNumber(Number(userData?.wallet))}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {!isWallet && (
                    <Link to="/wallet" className="bg-white center gap-1 font-sora font-medium text-primary text-sm px-4 py-2 rounded-sm">
                        <Wallet size={18} />
                        <span>Fund</span>
                    </Link>
                )}
                {isWallet && (
                    <div className="bg-white center gap-1 font-sora font-medium text-primary text-sm h-10 w-10 rounded-sm">
                        <Wallet size={18} />
                    </div>
                )}
            </div>
        </div>
    </div>
    </>
  )
}

export default WalletBanner