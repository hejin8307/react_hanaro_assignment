import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components";
import "./App.css";

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === "/";
  return (
    <div className="flex flex-col w-full">
      <AuthProvider>
        {!hideHeader && <Navbar />}
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
