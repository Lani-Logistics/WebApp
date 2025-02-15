import { useEffect, useState } from "react";

const useReverseGeocode = (latitude?: number, longitude?: number) => {
  const [address, setAddress] = useState<string | null>("Fetching address...");

  useEffect(() => {
    if (!latitude || !longitude) return;

    if (!window.google || !window.google.maps) {
      console.error("Google Maps API not loaded yet.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat: latitude, lng: longitude };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results?.[0]) {
        setAddress(results[0].formatted_address);
        console.log(results[0].formatted_address)
      } else {
        console.error("Reverse Geocoding failed:", status);
        setAddress("Unknown location");
      }
    });
  }, [latitude, longitude]);

  return address;
};

export default useReverseGeocode;
