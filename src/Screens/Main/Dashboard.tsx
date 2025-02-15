import { CustomerDashboard } from "@/Components/Customer";
import { RiderDashboard } from "@/Components/Rider";
import { useAuth } from "@/Hooks";

const Dashboard = () => {
  const { userData } = useAuth();
  const isRider = userData?.role === "rider";

  if (isRider) {
    return <RiderDashboard />;
  }

  return <CustomerDashboard />;
};

export default Dashboard;
