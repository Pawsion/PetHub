import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './pets.entity';
import { CreatePetDto } from './createPet.dto';
import { UpdatePetDto } from './updatePet.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  async createPet(dto: CreatePetDto): Promise<Pet> {
    const pet = this.petRepository.create(dto);
    return this.petRepository.save(pet);
  }

  async getAllPets(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async getPetById(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({ where: { pet_id: id } });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }

    return pet;
  }

  async updatePet(id: number, dto: UpdatePetDto): Promise<Pet> {
    await this.getPetById(id);

    await this.petRepository.update(id, dto);
    return this.getPetById(id);
  }

  async deletePet(id: number): Promise<void> {
    const result = await this.petRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Pet with ID ${id} not found`);
    }
  }
}
