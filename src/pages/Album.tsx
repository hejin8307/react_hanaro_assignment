import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { Button } from "../components";
import { FaHeart } from "react-icons/fa";

type AlbumList = {
  id: number;
  userId: number;
  title: string;
};

const Album = () => {
  const navigate = useNavigate();
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const { auth } = useAuth();
  const {
    isLoading,
    data: albumList,
    error,
  } = useFetch<AlbumList[]>({
    url: `https://jsonplaceholder.typicode.com/albums?userId=${auth.id}`,
    dependencies: [auth.id],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
        <FaHeart size={12} color="#27374D" />
      </div>
    );
  } else if (error !== "") {
    return (
      <div className="flex justify-center items-center h-screen">
        Try Again 🥲
      </div>
    );
  }

  return (
    <section className="m-4">
      <div>Album List</div>
      <ul>
        {albumList?.map((item, idx) => (
          <li
            key={item.id}
            className={`flex w-full gap-4 my-2 cursor-pointer hover:p-2 hover:rounded  ${
              selectedAlbumId === item.id
                ? "border-2 border-[#27374D] shadow-lg rounded p-2"
                : ""
            }`}
            onClick={() => setSelectedAlbumId(item.id)}
          >
            <p className="w-1/12 text-center">{idx + 1}.</p>
            <p className="w-11/12 line-clamp-1">{item.title}</p>
          </li>
        ))}
      </ul>
      <Button
        variant="primary"
        className="w-full mt-2"
        onClick={() => navigate(`/album/${selectedAlbumId}`)}
      >
        Detail
      </Button>
    </section>
  );
};

export default Album;
