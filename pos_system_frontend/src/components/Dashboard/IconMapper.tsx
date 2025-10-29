import { LayoutDashboard, Users, ChartBarStacked, Lock, LogOut, User, DollarSign } from "lucide-react";
import type { JSX } from "react";

export const iconMap: Record<string, JSX.Element> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Users: <Users size={20} />,
  ChartBarStacked: <ChartBarStacked size={20} />,
  Lock: <Lock size={20} />,
  LogOut: <LogOut size={18} />,
  User: <User size={20} />,
  DollarSign: <DollarSign size={20} />
};
