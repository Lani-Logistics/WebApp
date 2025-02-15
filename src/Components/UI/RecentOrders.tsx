import { Subtitle } from ".";
import { OrderCard } from ".";
import { usePackageOrder } from "@/Hooks";
import { useAuth } from "@/Hooks";
const RecentOrders = () => {
  const { userData } = useAuth();
  const { orders } = usePackageOrder();
  const activeOrders = orders
    .filter((order) => order.status === "in transit")
    .slice(0, 4);
  const recentOrders = orders.slice(0, 4);

  const displayedRecentOrders =
    userData?.role === "rider" ? activeOrders : recentOrders;

  const title = userData?.role === "rider" ? "Active Orders" : "Recent Orders";
  const subtitle = userData?.role === "rider" ? "" : "Recent Orders";
  const link = userData?.role === "rider" ? "" : "/orders";
  return (
    <>
      <Subtitle title={title} subtitle={subtitle} link={link} />
      {displayedRecentOrders.length === 0 && (
        <div className="text-center text-sub text-sm mt-4">No {title} yet!</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedRecentOrders.map((order) => (
          <OrderCard key={order.$id} order={order} />
        ))}
      </div>
    </>
  );
};

export default RecentOrders;
