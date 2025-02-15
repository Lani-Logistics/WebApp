import {  Timer } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { Subtitle } from "../UI"
import { usePackageOrder } from "@/Hooks";


const CustomerStats = () => {
  const{orders} = usePackageOrder()
    const quickStats = [
        {
          title: "Active Orders",
          value: orders.filter((order) => order.status === "in transit" || order.status === "delivered").length,
          icon: Timer,
          color: "text-purple-500",
          bg: "bg-purple-500/10",
          path: "/active"
        },
        {
          title: "Pending Orders",
          value: orders.filter((order) => order.status === "pending").length,
          icon: CheckCircle,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
          path: "/pending"
        },
      ];
  return (
    <div>
        <Subtitle title="Stats" />
        <div className="grid grid-cols-2 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-background space-y-1 transition-all cursor-pointer"
          >
          
          <div className={`h-10 w-10 center rounded-lg ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sub text-xs">{stat.title}</p>
                <h3 className="text-2xl font-bold text-main mt-1">
                  {stat.value}
                </h3>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomerStats