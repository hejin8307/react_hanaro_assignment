import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { AlbumListType } from "type";
import { getStorage, setStorage } from "../utils/localStorage";
import { AlbumList, Button } from "../components";

const Album = () => {
  const navigate = useNavigate();
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const { auth } = useAuth();

  const {
    isLoading,
    data: albumList,
    error,
  } = useFetch<AlbumListType[]>({
    url: `https://jsonplaceholder.typicode.com/albums?userId=${auth.id}`,
    dependencies: [auth.id],
  });

  useEffect(() => {
    const albumId = getStorage<number>("AlbumId");
    if (albumId) {
      setSelectedAlbumId(albumId);
    }
  }, []);

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

  const handleSelect = (id: number) => {
    setSelectedAlbumId(id);
  };

  return (
    <section className="h-full min-h-0 mt-4 ml-2">
      <div className="mb-2">List</div>
      <ul className="grid grid-cols-1 h-[89%] overflow-auto">
        {albumList?.map((item, idx) => (
          <AlbumList
            key={item.id}
            id={idx}
            album={item}
            isSelected={selectedAlbumId === item.id}
            onSelect={() => handleSelect(item.id)}
          />
        ))}
      </ul>
      <Button
        variant="primary"
        className="w-full mt-2"
        onClick={() => {
          setStorage("AlbumId", selectedAlbumId);
          navigate(`/album/${selectedAlbumId}`);
        }}
        disabled={!selectedAlbumId}
      >
        Details
      </Button>
    </section>
  );
};

export default Album;
