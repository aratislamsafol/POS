import { useSidebarStore } from "../../store/useSidebarStore";
import MenuItem from "../Dashboard/MenuItems";
import { useFilteredMenu } from "../../store/useFilteredMenu";
import { useLocation } from "react-router-dom";

const MenuOffCanvas = () => {
  const open = useSidebarStore((state) => state.open);
  const menu = useFilteredMenu();
  const location = useLocation();
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">
      <h3 className={`${!open && "hidden"} p-2 border-b border-gray-300 dark:border-gray-700 text-xl text-center font-semibold`}>
        Posra
      </h3>
      <div className="p-3 relative">
        <p className={`${!open && "hidden"} font-medium text-gray-600 dark:text-gray-300 text-xs`}>Menu</p>
        <ul className="mt-2 space-y-1 relative">
          {menu.map((item, idx) => (
            <MenuItem key={idx} item={item} open={open} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuOffCanvas;
