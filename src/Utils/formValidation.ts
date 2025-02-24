import { toast } from "sonner";

export const registerFormValidation = (
  form: FormType,
  setErrors: (errors: FormType) => void,
  errors: FormType
) => {
  if (!form.name) {
    setErrors({ ...errors, name: "Name is required" });
    return false;
  }
  if (!form.email) {
    setErrors({ ...errors, email: "Email is required" });
    return false;
  }
  if (!form.phoneNumber) {
    setErrors({ ...errors, phoneNumber: "Phone number is required" });
    return false;
  }
  if (!form.password) {
    setErrors({ ...errors, password: "Password is required" });
    return false;
  }
  if (form.password.length < 8) {
    setErrors({
      ...errors,
      password: "Password must be at least 8 characters",
    });
    return false;
  }

  return true;
};

export const loginFormValidation = (
  form: LoginFormTypes,
  setErrors: (errors: LoginFormTypes) => void,
  errors: LoginFormTypes
) => {
  if (!form.email) {
    setErrors({ ...errors, email: "Email is required" });
    return false;
  }
  if (!form.password) {
    setErrors({ ...errors, password: "Password is required" });
    return false;
  }
  if (form.password.length < 8) {
    setErrors({
      ...errors,
      password: "Password must be at least 8 characters",
    });
    return false;
  }
  return true;
};

export const dispatchFormValidation = (
  setCurrentStep: (step: number) => void,
  packageDetails: PackageDetails,
  pickupDetails: PickupDetails,
  deliveryDetails: DeliveryDetails,
  setPackageErrors: (errors: PackageDetails) => void,
  packageErrors: PackageDetails,
  pickupErrors: PickupDetails,
  deliveryErrors: DeliveryDetails,
  setPickupErrors: (errors: PickupDetails) => void,
  setDeliveryErrors: (errors: DeliveryDetails) => void,
) => {
 
  if (!packageDetails.image) {
    toast.error("Image is required");
    setCurrentStep(1);
    return false;
  }

  if (!packageDetails.name) {
    setPackageErrors({ ...packageErrors, name: "Name is required" });
    setCurrentStep(1);
    return false;
  }
  if (!packageDetails.texture) {
    setPackageErrors({ ...packageErrors, texture: "Texture is required" });
    setCurrentStep(1);
    return false;
  }
  if (!pickupDetails.pickupLocation) {
    setPickupErrors({ ...pickupErrors, pickupLocation: "Pickup location is required" });
    setCurrentStep(2);
    return false;
  }
  if (!pickupDetails.pickupTime) {
   toast.error("Pickup time is required");
    setCurrentStep(2);
    return false;
  }
  if (pickupDetails.pickupTime === "scheduled" && !pickupDetails.pickupDate) {
    setPickupErrors({ ...pickupErrors, pickupDate: "Pickup date is required" });
    setCurrentStep(2);
    return false;
  }
  if (!deliveryDetails.deliveryLocation) {
    setDeliveryErrors({ ...deliveryErrors, deliveryLocation: "Delivery location is required" });
    setCurrentStep(3);
    return false;
  }
  if (!deliveryDetails.receiverName) {
    setDeliveryErrors({ ...deliveryErrors, receiverName: "Receiver name is required" });
    setCurrentStep(3);
    return false;
  }
  if (!deliveryDetails.receiverPhone) {
    setDeliveryErrors({ ...deliveryErrors, receiverPhone: "Receiver phone is required" });
    setCurrentStep(3);
    return false;
  }

  return true;
};

export const restaurantRegistrationFormValidation = (
  form: FormType,
  setErrors: (errors: FormType) => void,
  errors: FormType
) => {
  if (!form.name) {
    setErrors({ ...errors, name: "Restaurant name is required" });
    return false;
  }
  if (!form.email) {
    setErrors({ ...errors, email: "Email is required" });
    return false;
  }
  if (!form.phoneNumber) {
    setErrors({ ...errors, phoneNumber: "Phone number is required" });
    return false;
  }
  if (!form.address) {
    setErrors({ ...errors, address: "Address is required" });
    return false;
  }
  if (!form.password) {
    setErrors({ ...errors, password: "Password is required" });
    return false;
  }
  if (form.password.length < 8) {
    setErrors({
      ...errors,
      password: "Password must be at least 8 characters",
    });
    return false;
  }
  return true;
}
