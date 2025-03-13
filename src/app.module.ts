import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompaniesModule } from './modules/companies/companies.module';
import { HousesModule } from './modules/houses/houses.module';
import { envSchema } from './core/infra/config/env/env';

@Module({
  imports: [
    CompaniesModule,
    HousesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => envSchema.parse(env),
    }),
  ],
})
export class AppModule {}
