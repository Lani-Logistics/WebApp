import { MainLayout } from "@/Layouts";
import { RiderActions, RiderStats } from "./index";
import { RecentOrders } from "../UI";
import { usePackageOrder } from "@/Hooks";
import clsx from "clsx";
import { TriangleAlert } from "lucide-react";
import { Track } from "../Main";


const RiderDashboard = () => {
  const {orders} = usePackageOrder()
  const activeOrders = orders?.filter((order) => order.status === "in transit")
  const isMax = activeOrders?.length === 2
  return (
    <MainLayout>
      <div>
      <div className="flex justify-between items-center p-4 mb-4 bg-background rounded-lg">
        <h3 className="text-md font-semibold">Status</h3>
        <div className="flex items-center gap-2 bg-mid shadow rounded-full py-2 px-4">
          <div className={clsx("w-2 h-2 bg-green-500 rounded-full", {
            "bg-red-500": isMax
          })}/>
          <p className="text-sm font-sora font-semibold">{isMax ? "Unavailable" : "Available"}</p>
       
        </div>
      </div>

      {isMax && (
      <div className="bg-yellow-500/10 my-4 text-yellow-500 p-4 rounded-lg text-sm flex items-center gap-2">
      <TriangleAlert className="flex-shrink-0"/>
      <p>You have reached the maximum number of orders you can accept at the moment. Please complete your current order before accepting a new one.</p>
      </div>
      )}
      <Track/>
        <RiderActions />
        <RiderStats />
        <RecentOrders/>
      </div>
    </MainLayout>
  );
};

export default RiderDashboard;
