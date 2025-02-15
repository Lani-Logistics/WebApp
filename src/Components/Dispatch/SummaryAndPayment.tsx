import { MessageCircleWarning} from "lucide-react";
import { useDispatchForm, useAdmin, useAuth } from "@/Hooks";
import { calculatePrice } from "@/Utils/helpers";
import { FormAnimation } from "@/Animations";

const SummaryAndPayment = () => {
  const { rates } = useAdmin();
  const { userData } = useAuth();
  const rate = userData?.location === "Uyo" ? rates?.rateForUyo : rates?.rateForPh;
  const {pickupDetails, deliveryDetails, loading, handleSubmitWithPayment, handleSubmitWithoutPayment} = useDispatchForm()
  const pickup = {
    lat: pickupDetails.pickupLocationLat,
    lon: pickupDetails.pickupLocationLng
  }
  const delivery = {
    lat: deliveryDetails.deliveryLocationLat,
    lon: deliveryDetails.deliveryLocationLng
  }

  const price = calculatePrice(pickup, delivery, rate)
  return (
    <FormAnimation>
      <div className="space-y-4">
        <h1 className="text-lg font-sora font-medium text-center line pb-2">
          Checkout
        </h1>

        {/* Summary*/}
        <div className="p-4 bg-background rounded-xl space-y-2">
          <h3 className="text-sm font-sora font-medium text-main">
            Price summary
          </h3>
          <div className="space-y-2 line pb-3">
           
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-sub">Flat Rate</p>
              <p className="text-sm font-medium font-sora text-main">&#8358; {rate}/km</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-sub">VAT</p>
              <p className="text-sm font-medium font-sora text-main">1.4%</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-main">Total</p>
            <p className="text-lg font-semibold font-sora text-primary">
              &#8358; {price.toLocaleString() || 0}
            </p>
          </div>
        </div>

        {/* Payment*/}
        <div className="flex md:flex-row flex-col-reverse gap-2">
            <button disabled={loading} onClick={handleSubmitWithoutPayment} type="submit" className="w-full center gap-2 font-sora text-sm font-medium bg-primary/10 text-primary rounded-md h-10">
                  Pay on Delivery
            </button>
            <button disabled={loading} onClick={handleSubmitWithPayment} type="submit" className="w-full center gap-2 font-sora text-sm font-medium bg-primary text-white rounded-md h-10">
                Pay from wallet
            </button>
        </div>

        <p className="text-sm text-sub flex items-center justify-center gap-2">
            <MessageCircleWarning className="text-primary"/>
          <span>Pay on delivery means the receiver will pay for the service!</span>
        </p>
      </div>
    </FormAnimation>
  );
};

export default SummaryAndPayment;
