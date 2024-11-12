import React from "react";
import { Home } from "@/components/icons/home";
import {
  Bell,
  CreditCard,
  FileDuoToneBlack,
  Settings,
} from "@/components/icons";
export const MENU_ITEMS = (
  currentWorkspaceId: string
): {
  title: string;
  href: string;
  icon: React.ReactNode;
}[] => [
  {
    title: "Home",
    href: `/dashboard/${currentWorkspaceId}/home`,
    icon: <Home />,
  },
  {
    title: "My Library",
    href: `/dashboard/${currentWorkspaceId}`,
    icon: <FileDuoToneBlack />,
  },
  {
    title: "Notification",
    href: `/dashboard/${currentWorkspaceId}/notifications`,
    icon: <Bell />,
  },
  {
    title: "Settings",
    href: `/dashboard/${currentWorkspaceId}/settings`,
    icon: <Settings />,
  },
  {
    title: "Billing",
    href: `/dashboard/${currentWorkspaceId}/billing`,
    icon: <CreditCard />,
  },
];
