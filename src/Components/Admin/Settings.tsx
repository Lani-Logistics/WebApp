import { BellPlus, Construction } from "lucide-react";
import { Subtitle } from "../UI";
import { Link } from "react-router-dom";
const Settings = () => {
    const  settings = [
        {
            title: "Flat Rates",
            subtitle: "Set the flat rates for different cities",
            to: "/admin/settings/flat-rates",
            icon: Construction
        },
        {
            title: "Notifications",
            subtitle: "Send notifications to the users",
            to: "/admin/settings/notifications",
            icon: BellPlus
        },
        
    ]
  return (
   <>
   <div>
    <Subtitle title="Settings" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.map((item) => (
            <Link to={item.to} key={item.title} className="bg-background border border-line hover:border-primary transition-all duration-300 rounded-xl p-4 space-y-4">
                <item.icon className="text-primary"/>
                <div>
                    <h3 className="text-main font-sora font-bold text-lg">{item.title}</h3>
                    <p className="text-sub text-sm">{item.subtitle}</p>
                </div>
            </Link>
        ))}
        </div>
   </div>
   </>
  )
}

export default Settings