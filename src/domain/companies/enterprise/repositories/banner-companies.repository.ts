import { BannerCompany } from '../entities/banner-company';

export abstract class IBannerCompaniesRepository {
  abstract create(data: BannerCompany): Promise<void>;
  abstract findById(bannerId: string): Promise<BannerCompany | undefined>;
  abstract save(data: BannerCompany): Promise<void>;
}
