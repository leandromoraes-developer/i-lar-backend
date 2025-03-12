export interface IStorageParams {
  fileName: string;
  fileType: string;
  body: Buffer;
  folder: string;
}

export abstract class IStorageGateway {
  abstract uploader(params: IStorageParams): Promise<{ url: string }>;
  abstract generateUniqueFileName(fileName: string): string;
  abstract getPublicFileUrl(fileName: string): string;
}
