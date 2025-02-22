import { Loader, ShieldEllipsis, Soup } from "lucide-react";
import { RestaurantLayout } from "@/Layouts";
import { useAuth } from "@/Hooks";
const RestaurantDashboard = () => {
  const {userData} = useAuth();
  const isVerified = userData?.isVerified;

  if(!isVerified){
    return (
      <RestaurantLayout>
        <div className="md:w-[480px] w-full mx-auto mt-6 space-y-4">
          <div>
            <h2 className="text-lg font-sora font-semibold text-center">
              {userData?.name}
            </h2>
            <p className="text-sub text-sm text-center">
              {userData?.address}
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
                Thank you for registering your restaurant with us! Your account is
                currently under review by our admin team.
              </p>
              <p className="text-sub text-sm mt-2">
                We are going through your data and will verify your account
                promptly. If our admin has any questions, they will reach out to
                you via the provided email.
              </p>
              <div className="center mt-4">
                <Loader className="animate-spin text-yellow-500" size={20} />
                <span className="ml-2 text-base text-main">
                  Verification in progress...
                </span>
              </div>
            </div>
          </div>
        </div>
      </RestaurantLayout>
    );
  }

  return (
    <RestaurantLayout>
      <div>
        <div>
          <div className="flex items-center gap-2">
            <div className="center rounded-full bg-background-2 text-sub h-14 w-14">
              <Soup size={20}/>
            </div>
            <div>
              <h1 className="text-lg font-sora font-semibold">{userData?.name}</h1>
              <p className="text-sub text-sm">{userData?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
};

export default RestaurantDashboard;
