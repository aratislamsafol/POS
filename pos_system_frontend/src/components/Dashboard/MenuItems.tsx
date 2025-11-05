import { memo, useState } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSidebarStore } from "../../store/useSidebarStore";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
interface Props {
  item: any;
  open: boolean;
}

const MenuItem = memo(({ item, open }: Props) => {
  const { expandedItems, toggleExpand } = useSidebarStore();
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  const hasChildren = !!item.children;
  const isExpanded = expandedItems[item.label];
  const isParentActive =
  location.pathname === item.path ||
  (item.children && item.children.some((child: any) => location.pathname.startsWith(child.path)));

  const parentContent = item.path ? (
 <NavLink
    to={item.path}
    className={clsx(
      "flex-1 flex items-center gap-2",
      !open && "justify-center w-full",
      "p-2 rounded cursor-pointer transition-all duration-200",
      isParentActive
        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
        : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
    )}
  >
    {item.icon}
    {open && <span className="text-sm font-medium">{item.label}</span>}
  </NavLink>
  ) : (
    <div
      onClick={hasChildren && open ? () => toggleExpand(item.label) : undefined}
      className={clsx(
        "flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
      )}
    >
      <div className={clsx("flex items-center gap-2", !open && "justify-center w-full")}>
        {item.icon}
        {open && <span className="text-sm font-medium">{item.label}</span>}
      </div>
      {hasChildren && open && (
        <div>{isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</div>
      )}
    </div>
  );

  return (
    <li
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Parent menu */}
      {parentContent}

      {/* Expanded children for open sidebar */}
      {open && hasChildren && (
        <ul
          className={clsx(
            "ml-6 pl-2 border-l border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {item.children?.map((child: any, idx: number) => (
            <li key={idx}>
              {child.path ? (
                <NavLink
                  to={child.path}
                  className={({ isActive }) =>
                    clsx(
                      "block py-1.5 pl-2 text-sm rounded transition-all duration-200",
                      isActive
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )
                  }
                >
                  {child.label}
                </NavLink>
              ) : (
                <span className="py-1.5 pl-2 text-sm text-gray-600 dark:text-gray-300">
                  {child.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Collapsed sidebar floating dropdown */}
      {!open && hasChildren && hovered && (
        <ul
          className={clsx(
            "absolute left-full top-0 min-w-[160px] rounded-md shadow-lg z-50",
            "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
            "py-2 transition-opacity duration-200 opacity-100"
          )}
        >
          {item.children?.map((child: any, idx: number) => (
            <li key={idx}>
              {child.path ? (
                <NavLink
                  to={child.path}
                  className={({ isActive }) =>
                    clsx(
                      "block py-1.5 px-3 text-sm rounded transition-all duration-200",
                      isActive
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )
                  }
                >
                  {child.label}
                </NavLink>
              ) : (
                <span className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200">
                  {child.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});

export default MenuItem;
