export interface Movie {
  [x: string]: any;
  _id: string;
  title: string;
  description: string;
  genre: string;
  videourl: string;
  video: string;
  uploadedat: Date;
  cloudinary_id: string;
  thumb: [
    {
      cloudinary_id: string;
      thumbnail: string;
      thumburl: string;
      _id: string;
    }
  ];
}
