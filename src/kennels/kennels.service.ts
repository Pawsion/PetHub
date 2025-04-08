import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kennel } from './kennels.entity';
import { Repository } from 'typeorm';
import { CreateKennelDto } from './createKennel.dto';

@Injectable()
export class KennelsService {
    constructor(
        @InjectRepository(Kennel)
        private readonly kennelRepository: Repository<Kennel>
    ){}
    
    async create(dto: CreateKennelDto): Promise<Kennel>{
        const kennel = await this.kennelRepository.findOne({where: {name: dto.name}});

        if( kennel){
            throw new BadRequestException("This kennel already exist");
        }
        return this.kennelRepository.save(await this.kennelRepository.create(dto))
    }
}
