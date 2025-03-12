import { Injectable } from '@nestjs/common';
import { IStorageGateway } from 'src/core/enterprise/gateways/storage/storage.gateway';
import { BannerCompany } from 'src/domain/companies/enterprise/entities/banner-company';
import { IBannerCompaniesRepository } from 'src/domain/companies/enterprise/repositories/banner-companies.repository';
import {
  IUploadBannerCompanyRequest,
  IUploadBannerCompanyResponse,
} from './upload-banner-company.interfaces';

@Injectable()
export class UploadBannerCompanyUseCase {
  constructor(
    private companiesBannerRepository: IBannerCompaniesRepository,
    private storageGateway: IStorageGateway,
  ) {}

  public async execute({
    buffer,
    mimeType,
    fileName,
  }: IUploadBannerCompanyRequest): Promise<IUploadBannerCompanyResponse> {
    const { url } = await this.storageGateway.uploader({
      body: buffer,
      fileName,
      fileType: mimeType,
      folder: '/banners-companies',
    });

    const bannerCompany = BannerCompany.create({
      fileName,
      mimeType,
      link: url,
      companyId: null,
    });

    await this.companiesBannerRepository.create(bannerCompany);

    return {
      bannerCompanyId: bannerCompany.id.toString(),
    };
  }
}
