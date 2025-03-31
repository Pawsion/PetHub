import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetService } from './pets.service';
import { PetController } from './pets.controller';
import { Pet } from './pets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  providers: [PetService],
  controllers: [PetController]
})
export class PetsModule {}
