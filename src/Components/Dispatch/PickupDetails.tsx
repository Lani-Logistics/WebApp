import { ArrowLeft, ArrowRight, CheckCircle, Circle } from "lucide-react";
import { Input } from "../UI";
import { useDispatchForm } from "@/Hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Autocomplete } from "@react-google-maps/api";
import { FormAnimation } from "@/Animations";

const PickupDetails = () => {
  const {
    pickupDetails,
    handlePickupDetails,
    setPickupDetails,
    handleNextStep,
    handlePrevStep,
    pickupErrors,
    setPickupAutocomplete,
    handlePlaceSelect,
  } = useDispatchForm();

  const handlePickupTime = (time: string) => {
    setPickupDetails({ ...pickupDetails, pickupTime: time });
  };
  return (
    <>
    <FormAnimation>
      <div className="space-y-4">
        <h1 className="text-lg font-sora font-medium text-center line pb-2">
          Pickup Details
        </h1>

        <div className="space-y-4">
          <div>
            <Autocomplete
              onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
              onPlaceChanged={() => handlePlaceSelect("pickup")}
            >
              <Input
                label="Pickup Address"
                name="pickupLocation"
                value={pickupDetails.pickupLocation}
                onChange={handlePickupDetails}
                placeholder="e.g. 123 Main St, Anytown"
                error={pickupErrors?.pickupLocation}
              />
            </Autocomplete>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-sub font-medium">Pickup Time</p>

            <div className="grid grid-cols-2 gap-4">
              {["immediate", "scheduled"].map((option) => (
                <div
                  onClick={() => handlePickupTime(option)}
                  key={option}
                  className={`flex cursor-pointer items-center bg-background rounded-md p-4 gap-2 border ${
                    pickupDetails.pickupTime === option
                      ? "border-primary"
                      : "border-line"
                  }`}
                >
                  {pickupDetails.pickupTime === option ? (
                    <CheckCircle size={18} className="text-primary" />
                  ) : (
                    <Circle size={18} className="text-sub" />
                  )}
                  <span className="text-sm font-sora capitalize font-medium">
                    {option}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            {pickupDetails.pickupTime === "scheduled" && (
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  label="Pickup Date"
                  name="pickupDate"
                  type="date"
                  value={pickupDetails.pickupDate}
                  onChange={handlePickupDetails}
                  placeholder="e.g. 12/12/2024"
                  error={pickupErrors?.pickupDate}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="flex gap-2">
            <button
              type="button"
              onClick={handlePrevStep}
              className="w-full center gap-2 font-sora text-sm font-medium bg-background text-sub rounded-md h-10"
            >
              <ArrowLeft size={18} />
              Previous
            </button>
            <button
              onClick={handleNextStep}
              type="button"
              className="w-full center gap-2 font-sora text-sm font-medium bg-primary/10 text-primary rounded-md h-10"
            >
              Next
              <ArrowRight size={18} />
            </button>
          </motion.div>
        </div>
      </div>
      </FormAnimation>
    </>
  );
};

export default PickupDetails;
