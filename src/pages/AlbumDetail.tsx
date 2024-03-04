import { useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AlbumThumbnailsDetail } from "type";
import useFetch from "../hooks/useFetch";
import { AlbumCard, Button } from "../components";

type AlbumDetails = {
  userId: number;
  id: number;
  title: string;
};

const AlbumDetail = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: isLoadingThumbnails,
    data: albumThumbnails,
    error: errorThumbnails,
  } = useFetch<AlbumThumbnailsDetail[]>({
    url: `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`,
    dependencies: [albumId],
  });

  const {
    isLoading: isLoadingTitle,
    data: albumTitle,
    error: errorTitle,
  } = useFetch<AlbumDetails>({
    url: `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    dependencies: [albumId],
  });

  const isLoading = isLoadingThumbnails || isLoadingTitle;
  const error = errorThumbnails || errorTitle;

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
    <section className="h-full min-h-0 mt-4 ml-2">
      <div className="mb-2">{albumTitle?.title}</div>
      <ul className="grid grid-cols-4 gap-2 h-[89%] overflow-auto">
        {albumThumbnails?.map((thumbnails: AlbumThumbnailsDetail) => (
          <AlbumCard key={thumbnails.id} thumbnails={thumbnails} />
        ))}
      </ul>
      <Button
        variant="primary"
        className="w-full mt-2"
        onClick={() => navigate(`/album`)}
      >
        Back
      </Button>
    </section>
  );
};

export default AlbumDetail;
