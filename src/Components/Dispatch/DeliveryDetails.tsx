import { useDispatchForm } from "@/Hooks";
import { Input } from "@/Components/UI";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Autocomplete } from "@react-google-maps/api";
import { FormAnimation } from "@/Animations";


const DeliveryDetails = () => {
  const {
    deliveryDetails,
    handleDeliveryDetails,
    handleNextStep,
    handlePrevStep,
    deliveryErrors,
    setDeliveryAutocomplete,
    handlePlaceSelect,
  } = useDispatchForm();
  return (
    <>
    <FormAnimation>
      <div className="space-y-4">
        <h1 className="text-lg font-sora font-medium text-center line pb-2">
          Delivery Details
        </h1>
        <div>
          <Autocomplete
            onLoad={(autocomplete) => setDeliveryAutocomplete(autocomplete)}
            onPlaceChanged={() => handlePlaceSelect("delivery")}
          >
            <Input
              label="Delivery Location"
              name="deliveryLocation"
              value={deliveryDetails.deliveryLocation}
              onChange={handleDeliveryDetails}
              placeholder="e.g. 123 Main St, Anytown, USA"
              error={deliveryErrors?.deliveryLocation}
            />
          </Autocomplete>
        </div>
        <Input
          label="Receiver Name"
          name="receiverName"
          value={deliveryDetails.receiverName}
          onChange={handleDeliveryDetails}
          placeholder="e.g. John Doe"
          error={deliveryErrors?.receiverName}
        />
        <Input
          label="Receiver Phone"
          name="receiverPhone"
          value={deliveryDetails.receiverPhone}
          onChange={handleDeliveryDetails}
          placeholder="e.g. 08060000000"
          error={deliveryErrors?.receiverPhone}
        />

        <div className="flex gap-2">
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
        </div>
      </div>
    </FormAnimation>
    </>
  );
};

export default DeliveryDetails;
