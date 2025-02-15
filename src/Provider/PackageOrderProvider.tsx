import client, {
  databases,
  DB,
  DISPATCH,
  STORAGE,
  storage,
  USERS,
} from "@/Backend/appwrite";
import { PackageOrderContext } from "../Context";
import { ID, Models, Query } from "appwrite";
import { useCallback, useEffect, useState } from "react";
import { generateTrackingId } from "@/Utils/helpers";
import { toast } from "sonner";
import { useAuth, useMaps } from "@/Hooks";
import { useNavigate } from "react-router-dom";

const PackageOrderProvider = ({ children }: { children: React.ReactNode }) => {
  const { getRiderLocation, isLocationEnabled, askForLocation } = useMaps();
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Models.Document[]>([]);
  const [parcels, setParcels] = useState<Models.Document[]>([]);
  const [allOrders, setAllOrders] = useState<Models.Document[]>([]);

  const createOrder = async (
    packageDetails: PackageDetails,
    deliveryDetails: DeliveryDetails,
    pickupDetails: PickupDetails,
    price: number,
    isPaid: boolean
  ) => {
    try {
      setLoading(true);
      if (!packageDetails.image) throw new Error("Package image is required");
      const packageImage = await storage.createFile(
        STORAGE,
        ID.unique(),
        packageDetails.image
      );
      const id = generateTrackingId();
      const res = await databases.createDocument(DB, DISPATCH, ID.unique(), {
        trackingId: `lani-${id}`,
        customerId: userData?.$id,
        city: userData?.location,
        price: price,
        pickupAddress: pickupDetails.pickupLocation,
        pickupLandmark: pickupDetails.pickupLocation,
        deliveryAddress: deliveryDetails.deliveryLocation,
        deliveryLandmark: deliveryDetails.deliveryLocation,
        pickupLatitude: pickupDetails.pickupLocationLat?.toString() || "0",
        pickupLongitude: pickupDetails.pickupLocationLng?.toString() || "0",
        deliveryLatitude:
          deliveryDetails.deliveryLocationLat?.toString() || "0",
        deliveryLongitude:
          deliveryDetails.deliveryLocationLng?.toString() || "0",
        notes: packageDetails.notes,
        time: pickupDetails.pickupTime,
        scheduledDate: pickupDetails.pickupDate,
        receiverName: deliveryDetails.receiverName,
        receiverPhone: deliveryDetails.receiverPhone,
        packageName: packageDetails.name,
        packageTexture: packageDetails.texture,
        packageImage: packageImage?.$id,
        senderName: userData?.name,
        senderPhone: userData?.phone,
        senderEmail: userData?.email,
        isPaid: isPaid,
      });
      navigate(`/orders/${res.trackingId}`, { state: { order: res } });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const getUserOrders = useCallback(async () => {
    if (!userData?.$id) return;
    try {
      const orders = await databases.listDocuments(DB, DISPATCH, [
        Query.or([
          Query.equal("customerId", userData?.$id),
          Query.equal("riderId", userData?.$id),
        ]),
        Query.orderDesc("$createdAt"),
      ]);
      setOrders(orders.documents);
    } catch (error) {
      console.error(error);
    }
  }, [userData?.$id]);

  const getAllOrders = useCallback(async () => {
    if (!userData?.$id || !userData?.location) return;
    try {
      const orders = await databases.listDocuments(DB, DISPATCH, [
        Query.equal("status", "pending"),
        Query.equal("city", userData.location),
        Query.orderDesc("$createdAt"),
      ]);
      setAllOrders(orders.documents);
    } catch (error) {
      console.error(error);
    }
  }, [userData?.$id, userData?.location]);

  const getParcels = useCallback(async () => {
    try {
      const orders = await databases.listDocuments(DB, DISPATCH, [
        Query.orderDesc("$createdAt"),
      ]);
      setParcels(orders.documents);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getUserOrders();
    getAllOrders(); 
    getParcels();
  }, [getUserOrders, getAllOrders, getParcels]);

  const acceptOrder = async (orderId: string) => {
    setLoading(true);
    try {
      if (!isLocationEnabled) {
        await askForLocation();
      } else {
        const location = await getRiderLocation();

        if (!location) {
          toast.error(
            "Failed to get location. Please enable GPS and try again."
          );
          return;
        }

        const res = await databases.updateDocument(DB, DISPATCH, orderId, {
          riderId: userData?.$id,
          status: "in transit",
        });

        await databases.updateDocument(DB, USERS, userData?.$id, {
          riderLatitude: location.latitude.toString(),
          riderLongitude: location.longitude.toString(),
        });

        toast.success("Order accepted successfully!");
        navigate(`/orders/${res.trackingId}`, { state: { order: res } });
      }
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const updateRiderLocation = useCallback(
    async () =>
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          if (userData?.role === "rider") {
            await databases.updateDocument(DB, USERS, userData.$id, {
              riderLatitude: latitude.toString(),
              riderLongitude: longitude.toString(),
            });
          }
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      ),
    [userData?.$id, userData?.role]
  );

  useEffect(() => {
    if (isLocationEnabled) {
      const interval = setInterval(() => {
        updateRiderLocation();
      }, 10000);
      return () => clearInterval(interval);
    } else {
      console.log("Location is not enabled");
    }
  }, [updateRiderLocation, isLocationEnabled]);

  const markAsDelivered = async (orderId: string) => {
    setLoading(true);
    try {
      await databases.updateDocument(DB, DISPATCH, orderId, {
        status: "delivered",
      });
      await databases.updateDocument(DB, USERS, userData?.$id, {
        riderLatitude: "0",
        riderLongitude: "0",
      });
      toast.success("Order marked as delivered!");
      getUserOrders();
      navigate(`/orders/completed`);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const markPaymentAsReceived = async (orderId: string) => {
    setLoading(true);
    try {
      await databases.updateDocument(DB, DISPATCH, orderId, {
        isPaid: true,
      });
      toast.success("Payment marked as received!");
      getUserOrders();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [`databases.${DB}.collections.${DISPATCH}.documents`],
      (response) => {
        const event = response.events[0];
        if (event.includes("create")) {
          getAllOrders();
          getUserOrders();
        } else if (event.includes("update")) {
          getAllOrders();
          getUserOrders();
        }
      }
    );
    return () => unsubscribe();
  }, [getAllOrders, getUserOrders]);

  const value: PackageOrderContextType = {
    orders,
    createOrder,
    loading,
    allOrders,
    acceptOrder,
    markAsDelivered,
    markPaymentAsReceived,
    parcels,
  };
  return (
    <PackageOrderContext.Provider value={value}>
      {children}
    </PackageOrderContext.Provider>
  );
};

export default PackageOrderProvider;
