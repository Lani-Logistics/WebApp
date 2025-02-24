import {MainLayout} from "@/Layouts"
import { Info } from "lucide-react"
const Notifications = () => {
  return (
    <>
    <MainLayout title="Send Notifications">
    <div className="flex flex-col items-center justify-center">
        <div className="p-4 bg-yellow-500/10 rounded-lg flex">
          <Info className="text-yellow-500 mr-3 flex-shrink-0" size={24} />
          <div>
            <h3 className=" text-yellow-500 font-semibold">Notifications Not Available Yet</h3>
            <p className="text-sub text-sm">
              Currently, "send notifications" options are not available. The Lani team is actively working towards providing this service.
            </p>
            <p className="text-sub text-sm">
              Stay tuned for updates, and thank you for your patience!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
    </>
  )
}

export default Notifications