import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PetService } from './pets.service';
import { CreatePetDto } from './createPet.dto';
import { UpdatePetDto } from './updatePet.dto';

@Controller('pets')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto) {
    return this.petService.createPet(createPetDto);
  }

  @Get()
  findAll() {
    return this.petService.getAllPets();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.petService.getPetById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.updatePet(+id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.petService.deletePet(+id);
  }
}
