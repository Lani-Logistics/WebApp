import { AlertCircle, LucideIcon } from "lucide-react";

import { CheckCircle2 } from "lucide-react";

import { Info } from "lucide-react";

import { Package } from "lucide-react";

export const generateTrackingId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const length = 5;
    let trackingId = "";
    for (let i = 0; i < length; i++) {
      trackingId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return trackingId;
  };

  export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
};

export const calculatePrice = (pickup: { lat: number; lon: number }, delivery: { lat: number; lon: number }, ratePerKm: number): number => {
    const distance = calculateDistance(pickup.lat, pickup.lon, delivery.lat, delivery.lon);
    const vat = 0.014;
    const basePrice = distance * ratePerKm;
    const totalPrice = basePrice + (basePrice * vat);
    return Math.round(totalPrice); 
}; 


export const notificationStyles: Record<NotificationType, { 
  icon: LucideIcon,
  iconColor: string,
  bgColor: string 
}> = {
  order: {
    icon: Package,
    iconColor: 'text-primary',
    bgColor: 'bg-orange-500/10'
  },
  system: {
    icon: Info,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  success: {
    icon: CheckCircle2,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  alert: {
    icon: AlertCircle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  food: {
    icon: Package,
    iconColor: 'text-primary_1',
    bgColor: 'bg-orange-500/10'
  }
};