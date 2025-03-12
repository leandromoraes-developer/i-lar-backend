import { Module } from '@nestjs/common';
import { CompaniesModule } from './modules/companies/companies.module';
import { HousesModule } from './modules/houses/houses.module';

@Module({
  imports: [CompaniesModule, HousesModule],
})
export class AppModule {}
