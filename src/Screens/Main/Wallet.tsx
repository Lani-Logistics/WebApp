import { MainLayout } from "@/Layouts"
import { WalletBanner } from "@/Components/Customer"
import { FundWallet } from "@/Components/Wallet"
import { Subtitle, TransactionList } from "@/Components/UI"
const Wallet = () => {
  return (
    <MainLayout title="Wallet">
        <WalletBanner/>
        <FundWallet/>
        <div>
          <Subtitle title="Transaction History" />
          <TransactionList />
        </div>
    </MainLayout>
  )
}

export default Wallet