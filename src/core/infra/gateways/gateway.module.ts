import { Module } from '@nestjs/common';
import { IStorageGateway } from 'src/core/enterprise/gateways/storage/storage.gateway';
import { R2StorageGateway } from './storage/r2-storage.gateway';
import { IGeolocationGateway } from 'src/core/enterprise/gateways/geolocation/geolocation.gateway';
import { MockGeolocationGateway } from './geolocation/mock-geolocation.gateway';

@Module({
  providers: [
    {
      provide: IStorageGateway,
      useClass: R2StorageGateway,
    },
    {
      provide: IGeolocationGateway,
      useClass: MockGeolocationGateway,
    },
  ],

  exports: [IStorageGateway, IGeolocationGateway],
})
export class GatewayModule {}
