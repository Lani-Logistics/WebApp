import { Link } from "react-router-dom"
import { Subtitle } from "../UI"
import { customerActions } from "@/Constants/data"
const Actions = () => {
  return (
    <div>
        <Subtitle title="Actions" />
        <div className="grid grid-cols-2 gap-4">
            {customerActions.map((action) => (
                <Link key={action.title} to={action.path} className="bg-background border border-line hover:border-primary transition-all duration-300 p-4 rounded-xl space-y-4 cursor-pointer">
                    <div className={`${action.color} ${action.bgColor} h-10 w-10 center rounded-lg`}><action.icon size={20}  /></div>
                    <div>
                        <h3 className="text-main text-sm font-sora font-medium">{action.title}</h3>
                        <p className="text-sub text-xs">{action.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Actions