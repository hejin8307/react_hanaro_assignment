import { memo } from "react";
import { AlbumListType } from "type";

type Props = {
  id: number;
  album: AlbumListType;
  isSelected: boolean;
  onSelect: () => void;
};

const AlbumItem = memo(({ id, album, isSelected, onSelect }: Props) => {
  return (
    <li
      className={`flex my-2 cursor-pointer py-4 shadow-md rounded-lg hover:border-2 hover:border-[#27374D] hover:py-6 hover:px-2 ${
        isSelected
          ? "text-white font-bold bg-[#27374D] shadow-lg rounded px-2 py-6"
          : ""
      }`}
      onClick={onSelect}
    >
      <p className="w-1/12 text-center">{id + 1}.</p>
      <p className="w-11/12 line-clamp-1">{album.title}</p>
    </li>
  );
});

export default AlbumItem;
