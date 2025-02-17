import { CustomerDashboard } from "@/Components/Customer";
import { RiderDashboard } from "@/Components/Rider";
import { useAuth } from "@/Hooks";
import { RestaurantDashboard } from "@/Components/Restaurant";
const Dashboard = () => {
  const { userData } = useAuth();
  const isRider = userData?.role === "rider";
  const isRestaurant = userData?.role === "restaurant";

  if (isRider) {
    return <RiderDashboard />;
  }

  if (isRestaurant) {
    return <RestaurantDashboard />;
  }

  return <CustomerDashboard />;
};

export default Dashboard;
