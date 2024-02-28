import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/";
  return (
    <div className="w-[500px] h-[800px] bg-white ">
      {!hideHeader && <Navbar />}
      <Outlet />
    </div>
  );
}

export default App;
