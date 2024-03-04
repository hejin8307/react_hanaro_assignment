import { AlbumThumbnailsDetail } from "type";

const AlbumCard = ({ thumbnails }: { thumbnails: AlbumThumbnailsDetail }) => {
  return (
    <li key={thumbnails.id}>
      <img
        className="rounded"
        src={thumbnails.thumbnailUrl}
        alt={thumbnails.title}
      />
    </li>
  );
};

export default AlbumCard;
