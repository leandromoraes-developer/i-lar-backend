import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { IBannerCompaniesRepository } from 'src/domain/companies/enterprise/repositories/banner-companies.repository';
import { BannerCompany } from 'src/domain/companies/enterprise/entities/banner-company';
import { PrismaBannerCompaniesMapper } from '../mappers/prisma-banner-companies.mapper';

@Injectable()
export class PrismaBannerCompaniesRepository
  implements IBannerCompaniesRepository
{
  constructor(private prismaService: PrismaService) {}
  public async create(bannerCompany: BannerCompany): Promise<void> {
    const data = PrismaBannerCompaniesMapper.toPrisma(bannerCompany);

    await this.prismaService.bannerCompanies.create({
      data,
    });
  }

  public async findById(bannerId: string): Promise<BannerCompany | undefined> {
    const bannerCompany = await this.prismaService.bannerCompanies.findUnique({
      where: {
        id: bannerId,
      },
    });

    if (!bannerCompany) return null;

    return PrismaBannerCompaniesMapper.toDomain(bannerCompany);
  }

  public async save(bannerCompany: BannerCompany): Promise<void> {
    const data = PrismaBannerCompaniesMapper.toPrisma(bannerCompany);

    await this.prismaService.bannerCompanies.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
