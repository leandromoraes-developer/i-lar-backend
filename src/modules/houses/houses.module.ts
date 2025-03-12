import { Module } from '@nestjs/common';
import { UploadImagesHouseController } from './infra/http/controllers/upload-images-house/upload-images-house.controller';
import { UplaodImagesHouseUseCase } from 'src/domain/houses/application/use-cases/upload-images-house/upload-images-house';
import { GatewayModule } from 'src/core/infra/gateways/gateway.module';
import { PrismaDatabaseModule } from 'src/core/infra/database/prisma/prisma-database.module';
import { GetHouseDetailController } from './infra/http/controllers/get-house-detail/get-house-detail.controller';
import { GetHouseDetailUseCase } from 'src/domain/houses/application/use-cases/get-house-detail/get-house-detail';
import { RegisterHouseController } from './infra/http/controllers/register-house/register-house.controller';
import { RegisterHouseUseCase } from 'src/domain/houses/application/use-cases/register-house/register-house';
import { FetchHouseUseCase } from 'src/domain/houses/application/use-cases/fetch-houses/fetch-houses';
import { FetchHousesController } from './infra/http/controllers/fetch-houses/fetch-houses.controller';
import { GetHouseFiltersController } from './infra/http/controllers/get-house-filters/get-house-filters.controller';
import { GetHouseFiltersUseCase } from 'src/domain/houses/application/use-cases/get-house-filters/get-house-filters';

const HOUSE_MODULE_PROVIDER = [
  UplaodImagesHouseUseCase,
  GetHouseDetailUseCase,
  RegisterHouseUseCase,
  FetchHouseUseCase,
  GetHouseFiltersUseCase,
];

@Module({
  imports: [GatewayModule, PrismaDatabaseModule],
  controllers: [
    UploadImagesHouseController,
    GetHouseDetailController,
    RegisterHouseController,
    FetchHousesController,
    GetHouseFiltersController,
  ],
  providers: HOUSE_MODULE_PROVIDER.map((provider) => ({
    provide: provider,
    useClass: provider,
  })),
})
export class HousesModule {}
