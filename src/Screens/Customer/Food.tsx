
import { Info } from "lucide-react";
import { MainLayout } from "@/Layouts"

const Food = () => {
  return (
    <MainLayout title="Food Delivery">
      <div className="flex flex-col items-center justify-center">
        <div className="p-4 bg-yellow-500/10 rounded-lg flex">
          <Info className="text-yellow-500 mr-3 flex-shrink-0" size={24} />
          <div>
            <h3 className=" text-yellow-500 font-semibold">Food Delivery Not Available Yet</h3>
            <p className="text-sub text-sm">
              Currently, food delivery options are not available. The Lani team is actively working towards providing this service.
            </p>
            <p className="text-sub text-sm">
              Stay tuned for updates, and thank you for your patience!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Food