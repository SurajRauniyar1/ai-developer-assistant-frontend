import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-dvh overflow-hidden bg-gray-950 text-white">
      <Outlet />
    </div>
  );
};

export default MainLayout;