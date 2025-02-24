import { MainLayout } from "@/Layouts";
import { RiderActions, RiderStats } from "./index";
import { RecentOrders } from "../UI";
import { useAuth, usePackageOrder } from "@/Hooks";
import clsx from "clsx";
import { Loader, ShieldEllipsis, TriangleAlert } from "lucide-react";
import { Track } from "../Main";


const RiderDashboard = () => {
  const {userData} = useAuth()
  const {orders} = usePackageOrder()
  const activeOrders = orders?.filter((order) => order.status === "in transit")
  const isMax = activeOrders?.length === 2
  const isVerified = userData?.isVerified

  if(!isVerified){
    return(
      <MainLayout>
       <div className="md:w-[480px] w-full mx-auto mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-sora font-semibold text-center">
              {userData?.name}
            </h2>
            <p className="text-sub text-sm text-center">
              {userData?.email}
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 gap-4 flex items-center flex-col space-x-4">
            <div className="flex-shrink-0 center h-20 w-20 rounded-full bg-yellow-500/10">
              <ShieldEllipsis className="text-yellow-500" size={40} />
            </div>
            <div className="flex-1 text-center">
              <h2 className="text-xl font-sora font-semibold">
                Account Verification
              </h2>
              <p className="text-sub text-sm mt-2">
                Thank you for registering with us! Your rider account is
                currently under review by our admin team.
              </p>
              <p className="text-sub text-sm mt-2">
                We are going through your data and will verify your account
                promptly. If our admin has any questions, they will reach out to
                you via the provided email.
              </p>
              <div className="center mt-4">
                <Loader className="animate-spin text-green-500" size={20} />
                <span className="ml-2 text-base text-main">
                  Verification in progress...
                </span>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

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
