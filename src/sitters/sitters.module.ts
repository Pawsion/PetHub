import { Module } from '@nestjs/common';
import { SittersController } from './sitters.controller';
import { SittersService } from './sitters.service';

@Module({
  controllers: [SittersController],
  providers: [SittersService]
})
export class SittersModule {}
