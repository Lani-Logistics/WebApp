import { Steps } from "@/Components/UI";
import { useDispatchForm } from "@/Hooks";
import { MainLayout } from "@/Layouts";
import {
  PackageDetails,
  PickupDetails,
  DeliveryDetails,
  SummaryAndPayment,
} from "@/Components/Dispatch";
import { AnimatePresence } from "framer-motion";
import { FormAnimation } from "@/Animations";

const Dispatch = () => {
  const { currentStep, setCurrentStep } = useDispatchForm();
  return (
    <>
      <MainLayout title="Request Dispatch">
        <div className="space-y-4">
          <Steps currentStep={currentStep} setCurrentStep={setCurrentStep} />
          <div>
            <AnimatePresence>
              {currentStep === 1 && (
                <FormAnimation>
                  <PackageDetails />
                </FormAnimation>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {currentStep === 2 && (
                <FormAnimation>
                  <PickupDetails />
                </FormAnimation>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {currentStep === 3 && (
                <FormAnimation>
                  <DeliveryDetails />
                </FormAnimation>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {currentStep === 4 && (
                <FormAnimation>
                  <SummaryAndPayment />
                </FormAnimation>
              )}
            </AnimatePresence>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Dispatch;
