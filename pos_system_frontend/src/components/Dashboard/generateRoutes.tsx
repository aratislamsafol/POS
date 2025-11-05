// src/components/Dashboard/generateRoutes.tsx
import Dashboard from "../../pages/Dashboard";
import UserPage from "../../pages/UserPage";
// import SaleToday from "../../pages/SaleToday";
// import SaleWeek from "../../pages/SaleWeek";
// import SaleMonth from "../../pages/SaleMonth";
import menuJson from "../../../public/dataset/MenuItems.json";
import type { RouteObject } from "react-router-dom";
import ProfileShow from "../../pages/ProfileShow";
import SaleWeek from "../../pages/SaleWeek";
import ProfileUpdate from "../../pages/ProfileUpdate";

export const generateRoutes = (): RouteObject[] => {
  const routes: RouteObject[] = [];

  menuJson.forEach((item) => {
    if (item.path && item.path.startsWith("/dashboard")) {
      const relativePath = item.path.replace("/dashboard/", "");
      routes.push({
        path: relativePath,
        element: getElementByLabel(item.label),
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        if (child.path.startsWith("/dashboard")) {
          const relativePath = child.path.replace("/dashboard/", "");
          routes.push({
            path: relativePath,
            element: getElementByLabel(child.label),
          });
        }
      });
    }
  });
  console.log(routes);
  // Default dashboard page
  routes.push({
    index: true,
    element: <Dashboard />,
  });

  return routes;
};

// Component retunrs with Label
function getElementByLabel(label: string) {
  switch (label) {
    case "Dashboard":
      return <Dashboard />;
    case "User":
      return <UserPage />;
    case "Show Profile":  
      return <ProfileShow />;
    case "Update Profile":
      return <ProfileUpdate />;
    case "This Week":
      return <SaleWeek />;
    // case "This Month":
    //   return <SaleMonth />;
    default:
      return <div>{label} Page</div>; // fallback
  }
}
