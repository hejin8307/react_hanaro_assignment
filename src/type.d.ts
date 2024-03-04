declare module "type" {
  export type AlbumListType = {
    id: number;
    userId: number;
    title: string;
  };

  export type AlbumThumbnailsDetail = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  };
}
