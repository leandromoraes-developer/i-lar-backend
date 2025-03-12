import { UniqueEntityId } from 'src/core/enterprise/object-value/unique-entity-id';
import { BannerCompany } from 'src/domain/companies/enterprise/entities/banner-company';
import { BannerCompanies as PrismaBannerCompanies } from '@prisma/client';

export class PrismaBannerCompaniesMapper {
  static toDomain(row: PrismaBannerCompanies) {
    return BannerCompany.create(
      {
        companyId: row.companyId ? new UniqueEntityId(row.companyId) : null,
        fileName: row.fileName,
        link: row.link,
        mimeType: row.mimeType,
      },
      new UniqueEntityId(row.id),
    );
  }
  static toPrisma(data: BannerCompany): PrismaBannerCompanies {
    return {
      companyId: data.companyId?.toString(),
      fileName: data.fileName,
      id: data.id.toString(),
      link: data.link,
      mimeType: data.mimeType,
    };
  }
}
