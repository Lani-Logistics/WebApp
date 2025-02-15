import { MainLayout } from "@/Layouts";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePackageOrder } from "@/Hooks";
import { Search, OrderCard, OrderFilter } from "@/Components/UI";
import { ArrowLeftRight } from "lucide-react";

const AvailableOrders = () => {
    const { allOrders } = usePackageOrder();
  
    const types = ["Package", "Food"];
    const [search, setSearch] = useState("");
    const [orderType, setOrderType] = useState(types[0]);
    const [showFilter, setShowFilter] = useState(false);
    const toggleFilter = () => {
      setShowFilter((prev) => !prev);
      };
  
    const filteredOrders = allOrders.filter((order) => {
      const matchedOrderName = order.packageName.toLowerCase().includes(search.toLowerCase());
      return matchedOrderName;
    });
  return (
    <>
  <MainLayout title={`Available ${orderType} Orders`}>
        <div>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Search
                placeholder="Search orders"
                search={search}
                setSearch={setSearch}
              />
            </div>
            <button
              onClick={toggleFilter}
              className="bg-primary text-white h-10 px-4 center gap-2 text-xs font-sora font-medium rounded-lg"
            >
              <ArrowLeftRight size={16} />
              Switch
            </button>
          </div>
          
          {orderType === "Package" && (
            <>
            {filteredOrders.length === 0 && (
              <div className="flex items-center mt-4 justify-center h-full">
                <p className="text-sub">No orders found!</p>
              </div>
            )}
              <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
                {filteredOrders.map((order) => (
                  <OrderCard key={order.$id} order={order} />
                ))}
              </div>
            </>
          )}
        </div>
      </MainLayout>

      <AnimatePresence>
        {showFilter && (
          <OrderFilter
            toggleFilter={toggleFilter}
            
            orderType={orderType}
            setOrderType={setOrderType}
            types={types}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default AvailableOrders