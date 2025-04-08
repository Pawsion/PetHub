import { Module } from '@nestjs/common';
import { KennelsService } from './kennels.service';
import { KennelsController } from './kennels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Kennel } from './kennels.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Kennel])],
  providers: [KennelsService],
  controllers: [KennelsController]
})
export class KennelsModule {}
