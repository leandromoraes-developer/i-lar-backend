export interface IUploadImagesHouseRequest {
  images: {
    fileName: string;
    buffer: Buffer;
    mimeType: string;
  }[];
}

export interface IUploadImagesHouseResponse {
  houseImageIds: string[];
}
