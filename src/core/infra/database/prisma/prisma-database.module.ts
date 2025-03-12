import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaCompaniesRepository } from './repositories/prisma-companies-repository';
import { ICompaniesRepository } from 'src/domain/companies/enterprise/repositories/companies-repository';
import { IBannerCompaniesRepository } from 'src/domain/companies/enterprise/repositories/banner-companies.repository';
import { PrismaBannerCompaniesRepository } from './repositories/prisma-banner-companies.repository';
import { IHouseImagesRepository } from 'src/domain/houses/enterprise/repositories/house-images.repository';
import { PrismaHouseImagesRepository } from './repositories/prisma-house-images.repository';
import { IHousesRepository } from 'src/domain/houses/enterprise/repositories/houses-repository';
import { PrismaHouseRepository } from './repositories/prisma-house.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ICompaniesRepository,
      useClass: PrismaCompaniesRepository,
    },
    {
      provide: IBannerCompaniesRepository,
      useClass: PrismaBannerCompaniesRepository,
    },

    {
      provide: IHouseImagesRepository,
      useClass: PrismaHouseImagesRepository,
    },
    {
      provide: IHousesRepository,
      useClass: PrismaHouseRepository,
    },
  ],

  exports: [
    ICompaniesRepository,
    IBannerCompaniesRepository,
    IHouseImagesRepository,
    IHousesRepository,
  ],
})
export class PrismaDatabaseModule {}
