import { Button } from "../components";

type Modal = {
  message: string;
  closeModal: () => void;
};

const Modal = ({ message, closeModal }: Modal) => {
  return (
    <div className="w-80 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl">
      <div className="flex flex-col justify-center items-center p-4">
        <div>{message}</div>
        <Button variant="primary" className="w-1/2 mt-2" onClick={closeModal}>
          확인
        </Button>
      </div>
    </div>
  );
};

export default Modal;
