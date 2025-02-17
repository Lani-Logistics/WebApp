import { CheckCircle, Loader } from "lucide-react";
import { MainLayout } from "@/Layouts";

const RestaurantDashboard = () => {
  return (
    <MainLayout>
      <div className="md:w-[480px] w-full mx-auto">
        <div className="bg-background rounded-lg p-6 gap-4 flex items-center flex-col space-x-4">
          <div className="flex-shrink-0 center h-20 w-20 rounded-full bg-primary-2/10">
            <CheckCircle className="text-primary-2" size={40} />
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
              <Loader className="animate-spin text-primary" size={20} />
              <span className="ml-2 text-primary">
                Verification in progress...
              </span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RestaurantDashboard;
