import { Module } from '@nestjs/common';
import { KennelsService } from './kennels.service';
import { KennelsController } from './kennels.controller';

@Module({
  providers: [KennelsService],
  controllers: [KennelsController]
})
export class KennelsModule {}
