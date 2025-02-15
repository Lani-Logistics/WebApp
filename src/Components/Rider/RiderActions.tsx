import { Package, Utensils } from "lucide-react"
import { Subtitle } from "../UI"
import { Link } from "react-router-dom"
import { usePackageOrder } from "@/Hooks"
const RiderActions = () => {
    const {allOrders} = usePackageOrder()
   const foodOrders = []
    const actions = [
        {
            title: "Accept Package",
            icon: Package ,
            path: "/orders/available",
            color: "text-primary",
            bgColor: "bg-primary/10",
            value: allOrders.length.toString().padStart(2, "0"),
        },
        {
            title: "Accept Food",
            icon: Utensils,
            path: "/orders",
            color: "text-primary-2",
            bgColor: "bg-primary-2/10",
            value: foodOrders.length.toString().padStart(2, "0"),
        }
            
    ]
  return (
    <div>
        <Subtitle title="Actions" />
        <div className="grid grid-cols-2 gap-4">
            {actions.map((action) => (
                <Link key={action.title} to={action.path} className="bg-background border border-line hover:border-primary transition-all duration-300 p-4 rounded-xl space-y-4 cursor-pointer">
                    <div className="flex items-center justify-between">
                        <div className={`${action.color} ${action.bgColor} h-10 w-10 center rounded-lg`}><action.icon size={20}  /></div>
                        
                    </div>
                    <div>
                        <h3 className="text-sub text-sm">{action.title} <br /> Orders</h3>
                        <div className="text-main text-2xl font-sora font-bold">{action.value}</div>
                    </div>
                </Link>
            ))}
        </div>
        </div>
        
  )
}

export default RiderActions