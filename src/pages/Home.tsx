import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdPhotos } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
import { Button, Modal } from "../components";

const Home = () => {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const idRef = useRef<HTMLInputElement | null>(null);

  const { login } = useAuth();

  const handleSubmit = () => {
    if (!idRef.current || !idRef.current.value) {
      setModalOpen(true);
      idRef.current?.focus();
      return;
    }

    const id = +idRef.current.value;
    if (id > 0 && id <= 10) {
      login(id);

      idRef.current!.value = "";
      navigate("/album");
    }
  };

  return (
    <section
      className={`flex flex-col justify-center items-center h-full ${
        modalOpen && "bg-[#dfdfdf]"
      }`}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <IoMdPhotos size="64" color="#27374D" />
          <div className="text-3xl font-bold">Hanaro Album</div>
        </div>

        <div className="flex justify-center mt-8 mb-4 gap-2">
          <IoPerson size="24" color="#27374D" />
          <div>
            <input
              ref={idRef}
              className="w-full indent-2 rounded-lg focus: border border-[#27374D] outline-none"
              type="number"
              min={1}
              max={10}
              placeholder="ID"
            />
            <div className="text-[8px] font-bold mt-2">
              User ID는 숫자 1에서 10까지만 입력 가능합니다.
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          className="font-semibold my-4"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </div>
      {modalOpen && (
        <Modal
          message="아이디를 입력해주세요."
          closeModal={() => setModalOpen(false)}
        />
      )}
    </section>
  );
};

export default Home;
