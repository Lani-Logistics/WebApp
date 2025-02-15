import { Actions } from "../Main";
import { CustomerStats } from ".";
import { Track } from "../Main";
import { MainLayout } from "@/Layouts";
import { WalletBanner } from ".";
import { RecentOrders } from "../UI";
const CustomerDashboard = () => {
  return (
    <>
    <MainLayout>
      <div>
        <WalletBanner />
        <Track />
        <Actions />
        <CustomerStats />
        <RecentOrders />
      </div>
    </MainLayout>
    </>
  );
};

export default CustomerDashboard;
