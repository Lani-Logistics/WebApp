import { Bike, Truck, Cable, Globe, Warehouse, PackageOpen, Utensils} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
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
    description: "Send packages across your city or interstate",
    icon: Bike,
    path: "/dispatch/type",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Food",
    description: "Order food from restaurants near you",
    icon: UtensilsCrossed,
    path: "/food",
    color: "text-primary-2",
    bgColor: "bg-primary-2/10",
  },
];

export const headerLinks = [
  {
    title: "Home",
    path: "",
  },
  {
    title: "About",
    path: "about",
  },
  {
    title: "Services",
    path: "services",
  },
  {
    title: "Contact",
    path: "contact",
  },
];


export const services = [
  {
    title: "Express Delivery",
    content: "Fast, same-day deliveries to meet your urgent needs.",
    icon: Truck,
  },
  {
    title: "Inter-state Delivery",
    content: "Efficient and secure delivery services across state borders.",
    icon: Globe,
  },
  {
    title: "Custom Solutions",
    content:
      "Logistics services tailored to your unique business requirements.",
    icon: Cable,
  },
  {
    title: "E-commerce Logistics",
    content:
      "Tailored solutions for online businesses, from warehouse management to last-mile delivery.",
    icon: Warehouse,
  },
];

export const offers = [
  {
    icon: PackageOpen,
    image: "/img6.jpg",
    title: "Lani Express",
    content:
      "Simplify your interstate logistics with Lani Express. Whether sending or receiving, we ensure swift and secure package delivery across Nigeria.",
  },
  {
    icon: Utensils,
    image: "/img4.jpg",
    title: "Lani Eats",
    content:
      "Savor the flavors you love with Lani Eats. Enjoy freshly prepared meals delivered straight to your doorstep, hassle-free.",
  },
];

export const faqs = [
  {
    question: "What does Lani do?",
    answer:
      "At Lani, we make it easy for business owners to get their products into the hands of customers quickly. Our fast and reliable delivery service takes the hassle out of logistics, so you can focus on growing your business.",
  },
  {
    question: "Where does Lani Operate?",
    answer:
      "Right now, we're proudly serving Uyo and Port Harcourt. But we're just getting started - Lani is expanding fast, and soon, we'll be delivering across most states in Nigeria.",
  },
  {
    question: "What makes Lani unique?",
    answer:
      "Lani works just like your favourite ride-hailing service providers, such as Bolt and Uber. We connect you to a dispatch rider closest to you, who'll arrive under 15 minutes. In addition, you can track the rider in real-time from pick-up to drop-off, giving you peace of mind every step of the way.",
  },
  {
    question: "Does Lani have other services?",
    answer:
      "Yes, we have Lani Express to handle all your within and interstate package deliveries, then Lani Eats to get delicious meal delivered right to your doorsteps",
  },
];

export const socials = [
  {
    icon: FaInstagram,
    name: "@lani_logistics",
    link: "",
  },
  {
    icon: FaFacebook,
    name: "Lani Logistics",
    link: "",
  },
  {
    icon: FaWhatsapp,
    name: "Lani community",
    link: "",
  },
];