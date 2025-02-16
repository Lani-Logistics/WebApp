import { useState } from "react";
import { Subtitle } from "../UI";
import { Input } from "../UI";
import { useAdmin } from "@/Hooks";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const Flatrates = () => {
  const { rates, isUpdatingUyo, isUpdatingPh, updateRatesUyo, updateRatesPh } = useAdmin();
  const [flatUyoRate, setFlatUyoRate] = useState(rates?.rateForUyo);
  const [flatPortHarcourtRate, setFlatPortHarcourtRate] = useState(
    rates?.rateForPh
  );

  const handleUpdateUyoRate = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(updateRatesUyo(flatUyoRate), {
      loading: "Updating Uyo rate...",
      success: "Uyo rate updated successfully",
      error: (error) => (error as Error).message,
    });
  };

  const handleUpdatePhRate = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(updateRatesPh(flatPortHarcourtRate), {
      loading: "Updating Port Harcourt rate...",
    });
  };
  return (
    <>
      <div>
        <Subtitle title="Flat Rates" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background border border-line rounded-xl p-4">
            <div>
              <p className="text-sub text-sm">Uyo</p>
              <h3 className="text-main font-sora font-bold text-2xl">
                &#8358; {rates?.rateForUyo}
              </h3>
            </div>
            <form className="mt-4 space-y-4" onSubmit={handleUpdateUyoRate}>
              <Input
                type="number"
                placeholder="Update flat uyo rate"
                style={{ backgroundColor: "var(--secondary)" }}
                value={flatUyoRate || ""}
                onChange={(e) => setFlatUyoRate(e.target.value)}
              />
              <button disabled={isUpdatingUyo} className="btn bg-primary w-full h-10 text-white rounded-md">
                {isUpdatingUyo ? <Loader size={18} className="animate-spin" /> : "Update"}
              </button>
            </form>
          </div>
          <div className="bg-background border border-line rounded-xl p-4">
            <div>
              <p className="text-sub text-sm">Port Harcourt</p>
              <h3 className="text-main font-sora font-bold text-2xl">
                &#8358; {rates?.rateForPh}
              </h3>
            </div>
            <form className="mt-4 space-y-4" onSubmit={handleUpdatePhRate}>
              <Input
                type="number"
                placeholder="Update flat port harcourt rate"
                style={{ backgroundColor: "var(--secondary)" }}
                value={flatPortHarcourtRate || ""}
                onChange={(e) => setFlatPortHarcourtRate(e.target.value)}
              />
              <button disabled={isUpdatingPh} className="btn bg-primary w-full h-10 text-white rounded-md">
                {isUpdatingPh ? <Loader size={18} className="animate-spin" /> : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flatrates;
