import { Outlet } from "react-router-dom";
import MenuOffCanvas from "../components/Dashboard/MenuOffCanvas";
import clsx from "clsx";
import { useSidebarStore } from "../store/useSidebarStore";
// import DashBoardContent from "../components/Dashboard/DashBoardContent";

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
           {/* mobile menuBar */}
           <div className={clsx('z-10 border-gray-300 border-b')}>
          <div className="flex flex-col gap-1 group cursor-pointer p-[15px] w-fit transition-all duration-500 ease-in-out" onClick={()=>setOpen(!open)}>
            <p className={clsx(
              'rounded-md h-[2px] bg-gray-400 group-hover:bg-gray-500', open ? 'w-5': 'w-4' 
            )}></p>
            <p className={clsx(
              'rounded-md h-[2px] bg-gray-400 group-hover:bg-gray-500', open?'w-4':' w-5'
            )}></p>
            <p className={clsx(
              'rounded-md h-[2px] bg-gray-400 group-hover:bg-gray-500', open?'w-5': 'w-4'
            )}></p>
          </div>
          </div>
           <Outlet />
          
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
