export interface IUploadBannerCompanyRequest {
  fileName: string;
  mimeType: string;
  buffer: Buffer;
}

export interface IUploadBannerCompanyResponse {
  bannerCompanyId: string;
}
