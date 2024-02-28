import { useNavigate } from "react-router-dom";
import { IoMdPhotos } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { Button } from "../components";

const Home = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col justify-center items-center h-[800px]">
      {/* 로고 & 이름 */}
      <div className="flex flex-col items-center">
        <IoMdPhotos size="64" color="#27374D" />
        <div className="text-3xl font-bold">Hanaro Album</div>
      </div>

      {/* 아이디 */}
      <div className="flex justify-center items-center mt-8 mb-4 gap-2">
        <IoPerson size="24" color="#27374D" />
        <input
          className="indent-2 rounded-lg focus: border border-[#27374D] outline-none"
          type="number"
          placeholder="ID"
        />
      </div>

      {/* 로그인 버튼 */}
      <Button
        variant="primary"
        className="font-semibold my-4 cursor-pointer"
        onClick={() => navigate("/signin")}
      >
        Sign In
      </Button>
    </section>
  );
};

export default Home;
