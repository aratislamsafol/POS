import { useSidebarStore } from "./useSidebarStore";
import { iconMap } from "../components/Dashboard/IconMapper";
import menuJson from "../../public/dataset/MenuItems.json";

export const useFilteredMenu = () => {
  const role = useSidebarStore((state) => state.role);

  return menuJson
    .filter((item) => item.roles.includes(role))
    .map((item) => ({
      ...item,
      icon: typeof item.icon === "string" ? iconMap[item.icon] : item.icon,
      children: item.children
        ? item.children.filter((child) => child.roles.includes(role))
        : undefined,
    }));
};
