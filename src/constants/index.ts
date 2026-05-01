import { Wind, Sparkles, Droplets, Heart, Trash2, Zap } from "lucide-react";
import { Product } from "@birgo/types";

export const products: Product[] = [
  { id: "1", name: "Klósettpappír", icon: Wind, category: "Bathroom" },
  { id: "2", name: "Eldhúsrúllur", icon: Wind, category: "Kitchen" },
  { id: "3", name: "Tannbursti", icon: Sparkles, category: "Bathroom" },
  { id: "4", name: "Tannkrem", icon: Sparkles, category: "Bathroom" },
  { id: "5", name: "Þvottarefni", icon: Droplets, category: "Laundry" },
  { id: "6", name: "Handsápa", icon: Droplets, category: "Bathroom" },
  {
    id: "7",
    name: "Bómull og eyrnapinnar",
    icon: Sparkles,
    category: "Bathroom",
  },
  { id: "8", name: "Túrvörur", icon: Heart, category: "Bathroom" },
  { id: "9", name: "Uppþvottatöflur", icon: Sparkles, category: "Kitchen" },
  { id: "10", name: "Uppþvottalögur", icon: Droplets, category: "Kitchen" },
  { id: "11", name: "Þvottabursti", icon: Trash2, category: "Kitchen" },
  { id: "12", name: "Svampar", icon: Zap, category: "Kitchen" },
  {
    id: "13",
    name: "Klósettbursti og salernishreinsir",
    icon: Trash2,
    category: "Bathroom",
  },
];

export const householdSizes = [
  "1 person",
  "2 people",
  "3-4 people",
  "5+ people",
];
export const householdTypes = [
  "Living alone",
  "Couple",
  "Family with kids",
  "Shared apartment",
];
export const productCategories = ["Bathroom", "Kitchen", "Cleaning", "Laundry"];
export const usageFrequencies = ["Light use", "Moderate use", "Heavy use"];
