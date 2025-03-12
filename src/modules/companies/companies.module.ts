import { Module } from '@nestjs/common';
import { PrismaDatabaseModule } from 'src/core/infra/database/prisma/prisma-database.module';
import { RegisterCompanyController } from './infra/http/controllers/register-company/register-company.controller';
import { RegisterCompanyUseCase } from 'src/domain/companies/application/use-cases/register-company/register-company';
import { UploadBannerCompanyController } from './infra/http/controllers/upload-banner-company/upload-banner-company.controller';
import { UploadBannerCompanyUseCase } from 'src/domain/companies/application/use-cases/upload-banner-company/upload-banner-company';
import { GatewayModule } from 'src/core/infra/gateways/gateway.module';

@Module({
  imports: [PrismaDatabaseModule, GatewayModule],
  controllers: [RegisterCompanyController, UploadBannerCompanyController],
  providers: [
    {
      provide: RegisterCompanyUseCase,
      useClass: RegisterCompanyUseCase,
    },
    {
      provide: UploadBannerCompanyUseCase,
      useClass: UploadBannerCompanyUseCase,
    },
  ],
})
export class CompaniesModule {}
