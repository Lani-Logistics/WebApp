import { Timer } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { usePackageOrder } from "@/Hooks";
import { Subtitle } from "../UI"
const RiderStats = () => {
    const {orders} = usePackageOrder()
    const stats = [
        {
          title: "Active Orders",
          value: orders.filter((order) => order.status === "in transit").length,
          icon: Timer,
          color: "text-purple-500",
          bg: "bg-purple-500/10",
          path: "/active"
        },
        {
          title: "Completed Orders",
          value: orders.filter((order) => order.status === "delivered").length,
          icon: CheckCircle,
          color: "text-yellow-500",
          bg: "bg-yellow-500/10",
          path: "/pending"
        },
      ];
  return (
    <div>
        <Subtitle title="Stats" subtitle="Completed Orders" link="/orders/completed" />
        <div className="grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-background transition-all duration-300 p-4 rounded-xl space-y-4 cursor-pointer">
                <div className="flex items-center justify-between">
                    <div className={`${stat.color} ${stat.bg} h-10 w-10 center rounded-lg`}><stat.icon size={20}  /></div>
                </div>
                <div>
                    <h3 className="text-sub text-sm">{stat.title}</h3>
                    <div className="text-main text-2xl font-sora font-bold">{stat.value}</div>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default RiderStats