import { Bike } from "lucide-react";

import { UtensilsCrossed } from "lucide-react";

export const slides = [
  {
    image: "/tracking.svg",
    title: "Track Your Shipments",
    description: "Real-time tracking of all your deliveries",
  },
  {
    image: "/delivery.svg",
    title: "Fast Delivery",
    description: "Quick and reliable logistics solutions",
  },
  {
    image: "/food.svg",
    title: "Food Delivery",
    description: "Order a quick snack from your favorite restaurants",
  },
];

export const states = [
  {
    id: 1,
    state: "Akwa Ibom",
    capital: "Uyo",
    abbreviation: "Uyo",
  },
  {
    id: 2,
    state: "Rivers",
    capital: "Port Harcourt",
    abbreviation: "Port",
  },
  {
    id: 3,
    state: "Benin",
    capital: "Benin City",
    abbreviation: "Benin",
  },
];

export const customerActions = [
  {
    title: "Dispatch",
    description: "Send packages across your city",
    icon: Bike,
    path: "/dispatch",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Food",
    description: "Order from restaurants near you",
    icon: UtensilsCrossed,
    path: "/food",
    color: "text-primary-2",
    bgColor: "bg-primary-2/10",
  },
];
