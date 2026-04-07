import { Home, Video, User, Bell, UserCheck } from "lucide-react";

export const NavItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Dashboard", icon: Video, href: "/dashboard" },
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Subscriptions", icon: UserCheck, href: "/subscriptions" },
  { label: "Notifications", icon: Bell, href: "/notifications" },
];