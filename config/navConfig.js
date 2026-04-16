import {
  LayoutDashboard,
  Package,
  Wallet,
  Users,
  Gift,
  BadgeDollarSign,
  BarChart3,
  UserCog,
  UserX,
  Send,
} from "lucide-react";

export const NAV_CONFIG = {
  admin: {
    sidebar: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Statistics", href: "/admin/statistics", icon: BarChart3 },
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "All User", href: "/admin/users", icon: Users },
      { label: "Transactions", href: "/admin/transactions", icon: BadgeDollarSign },
      { label: "Wallet", href: "/admin/wallet", icon: Wallet },
      { label: "Gift Cards", href: "/admin/gift-cards", icon: Gift },
      { label: "Managers", href: "/admin/managers", icon: UserCog },
      { label: "Ignored Users", href: "/admin/ignored-users", icon: UserX },
      { label: "Telegram Setup", href: "/admin/telegram", icon: Send },
    ],

   
    navbar: {
      showRedeem: false,
      showWithdraw: true,
      showFundDeposit: true,

      showSearch: true,
      showCalendar: true,
      showMail: true,
      showBell: true,
      showFlag: true,
      showProfile: true,
    },
  },

  user: {
    sidebar: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Products", href: "/products", icon: Package },
      { label: "Wallet Management", href: "/wallet", icon: Wallet },
    ],

  
    navbar: {
      showRedeem: true,
      showWithdraw: false,
      showFundDeposit: false,

      showSearch: false,
      showCalendar: false,
      showMail: false,
      showBell: false,
      showFlag: false,
      showProfile: true,
    },
  },
};