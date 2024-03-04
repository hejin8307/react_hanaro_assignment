import { useNavigate } from "react-router-dom";
import { IoMdPhotos } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="relative flex items-center py-4 bg-[#27374D] text-white rounded-md">
      <div className="flex flex-col justify-center items-center grow">
        <IoMdPhotos size="40" color="#fff" />
        <div className="flex flex-col items-center font-black leading-4 tracking-wider">
          <p>Hanaro</p>
          <p>Album</p>
        </div>
      </div>

      <div className="absolute right-0 flex flex-col justify-center items-center font-semibold pr-2">
        <div className="flex text-sm gap-1">
          <div>{auth.id}</div>
          <div>{auth.name}</div>
        </div>
        <button className="cursor-pointer" onClick={handleLogout}>
          <TbLogout size={24} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
