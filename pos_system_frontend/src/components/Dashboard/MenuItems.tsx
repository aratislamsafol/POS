import { memo, useState } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSidebarStore } from "../../store/usesidebarStore";

interface Props {
  item: any;
  open: boolean;
}

const MenuItem = memo(({ item, open }: Props) => {
  const { expandedItems, toggleExpand } = useSidebarStore();
  const [hovered, setHovered] = useState(false);

  const hasChildren = !!item.children;
  const isExpanded = expandedItems[item.label];

  return (
    <li
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Parent menu */}
      <div
        onClick={hasChildren && open ? () => toggleExpand(item.label) : undefined}
        className={clsx(
          "p-2 rounded flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        )}
      >
        <div className={clsx("flex items-center gap-2", !open && "justify-center w-full")}>
          {item.icon}
          {open && <span className="text-sm font-medium">{item.label}</span>}
        </div>
        {hasChildren && open && <div>{isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</div>}
      </div>

      {/* Expanded children for open sidebar */}
      {open && hasChildren && (
        <ul
          className={clsx(
            "ml-6 pl-2 border-l border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300",
            isExpanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {item.children?.map((child: any, idx: number) => (
            <li
              key={idx}
              className="py-1.5 pl-2 text-sm text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              {child.label}
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
            <li
              key={idx}
              className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {child.label}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});

export default MenuItem;
