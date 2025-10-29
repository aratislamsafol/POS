import { Outlet } from "react-router-dom";
import MenuOffCanvas from "../components/Dashboard/MenuOffCanvas";
import clsx from "clsx";
import { useSidebarStore } from "../store/usesidebarStore";
import DashBoardContent from "../components/Dashboard/DashBoardContent";

const DashBoardLayout = () => {
  const open = useSidebarStore((state) => state.open);
  const setOpen = useSidebarStore((state) => state.setOpen);

  return (
    <div className="max-w-[1660px] mx-auto">
      <div className="flex transition-all duration-500 ease-in-out">
        {/* Sidebar */}
        <div
          className={clsx(
            "border-r border-gray-300 shadow-xs bg-white h-screen transition-all duration-500 ease-in-out",
            open ? "w-[200px]" : "w-[70px]"
          )}
        >
          <MenuOffCanvas />
        </div>

        {/* Main Content */}
        <div
          className={clsx(
            "flex-1 transition-all duration-500 ease-in-out"
          )}
        >
          <DashBoardContent open={open} setOpen={setOpen} />
          <div className="p-4 transition-all duration-500 ease-in-out">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
