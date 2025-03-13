import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

@Module({
  providers: [
    {
      useClass: EnvService,
      provide: EnvService,
    },
  ],
  exports: [EnvService],
})
export class EnvModule {}
