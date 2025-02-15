import { useDispatchForm } from "@/Hooks";
import { ArrowRight, Camera, ImagePlus } from "lucide-react";
import { Input, Select } from "../UI";
import { FormAnimation } from "@/Animations";
const PackageDetails = () => {
  const { packageDetails, imgPreview, handleImageChange, handleNextStep, handlePackageDetails, handleSelectChange, packageErrors } = useDispatchForm();

  return (
    <FormAnimation>
      <div className="space-y-4">
        <h1 className="text-lg font-sora font-medium text-center line pb-2">
          Package Details
      </h1>

      <div className="space-y-4">
        <div>
            <p className="block text-sm font-medium text-sub mb-1">Package Image</p>
            <label htmlFor="image">
              <input type="file" name="image" id="image" className="hidden" onChange={handleImageChange} accept=".png, .jpg, .jpeg" />
              {!imgPreview && (
                <div className="w-full h-30 bg-background flex-col gap-2 border-dashed border-2 border-line rounded-lg center">
                  <ImagePlus size={24} className="text-sub" />
                  <p className="text-sm font-sora font-medium text-sub">
                    Upload Image
                  </p>
                  <p className="text-xs text-sub">PNG, JPG, JPEG (max. 2MB)</p>
                </div>
              )}
              {imgPreview && (
                <div className="w-40 h-40 mx-auto bg-background border-2 border-line rounded-xl center relative">
                  <img
                    src={imgPreview}
                    alt="package"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 -right-4 bg-primary rounded-full p-1">
                    <Camera size={24} />
                  </div>
                </div>
              )}
            </label>
        </div>

        <Input
          label="Package Name"
          name="name"
          value={packageDetails.name}
          onChange={handlePackageDetails}
          placeholder="e.g. Laptop"
          error={packageErrors?.name}
        />

        <Select
          label="Package Texture"
          name="texture"
          value={packageDetails.texture}
          onChange={handleSelectChange}
          options={[
            { value: "non-breakable", label: "Non-Breakable" },
            { value: "breakable", label: "Breakable" },
            { value: "perishable", label: "Perishable" },
          ]}
          error={packageErrors?.texture}
        />
        <Input
          label="Additional Notes (Optional)"
          name="notes"
          value={packageDetails.notes}
          onChange={handlePackageDetails}
          placeholder="e.g. Please deliver to the reception"
        />

        <button type="button" onClick={handleNextStep} className="w-full bg-primary/10 text-sm font-sora font-medium center gap-2 text-primary py-2 rounded-lg cursor-pointer">
          Next
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
    </FormAnimation>
  );
};

export default PackageDetails;
