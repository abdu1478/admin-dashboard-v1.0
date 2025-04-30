import { Activity, Users, Package, ShoppingCart, CreditCard } from "lucide-react";
import { NavItem } from "../types/dashboard";

export const NAV_ITEMS: NavItem[] = [
  { id: "analytics", label: "Analytics", icon: Activity },
  { id: "team", label: "Team", icon: Users },
  { id: "projects", label: "Projects", icon: Package },
  { id: "sales", label: "Sales", icon: ShoppingCart },
  { id: "billing", label: "Billing", icon: CreditCard },
];