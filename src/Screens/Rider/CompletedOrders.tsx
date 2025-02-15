import { MainLayout } from "@/Layouts"
import { useState } from "react";
import { OrderCard, Search } from "@/Components/UI";
import { usePackageOrder } from "@/Hooks";
const CompletedOrders = () => {
    const {orders} = usePackageOrder();
    const [search, setSearch] = useState("");
    const filteredOrders = orders.filter((order) => {
        const matchedOrderName = order.packageName.toLowerCase().includes(search.toLowerCase());
        const matchedOrderStatus = order.status === "delivered";
        return matchedOrderName && matchedOrderStatus;
      });
  return (
    <>
    <MainLayout title="Completed Orders">
        <div>
            <Search placeholder="Search orders" search={search} setSearch={setSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filteredOrders.map((order) => (
                <OrderCard key={order.$id} order={order} />
            ))}
        </div>
        </div>

    </MainLayout>
    </>
  )
}

export default CompletedOrders