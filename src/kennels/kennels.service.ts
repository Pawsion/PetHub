import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Kennel } from './kennels.entity';
import { Between, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateKennelDto } from './createKennel.dto';

@Injectable()
export class KennelsService {
  constructor(
    @InjectRepository(Kennel)
    private readonly kennelRepository: Repository<Kennel>,
  ) {}

  async create(dto: CreateKennelDto): Promise<Kennel> {
    const kennel = await this.kennelRepository.findOne({
      where: { name: dto.name },
    });

    if (kennel) {
      throw new BadRequestException('This kennel already exist');
    }
    return this.kennelRepository.save(await this.kennelRepository.create(dto));
  }

  async findAll(
    location?: string,
    minPrice?: number,
    maxPrice?: number,
    page = 1,
    limit = 10,
    sortBy: 'price_per_night' | 'name' | 'created_at' = 'price_per_night',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    const where: any = {};
  
    if (location) {
      where.location = ILike(`%${location}%`); // case-insensitive LIKE
    }
  
    if (minPrice !== undefined && maxPrice !== undefined) {
        where.price_per_night = Between(minPrice, maxPrice);
      } else if (minPrice !== undefined) {
        where.price_per_night = MoreThanOrEqual(minPrice);
      } else if (maxPrice !== undefined) {
        where.price_per_night = LessThanOrEqual(maxPrice);
      }
  
    const [data, total] = await this.kennelRepository.findAndCount({
      where,
      order: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
      select: ['kennel_id', 'name', 'location', 'price_per_night', 'created_at'], // možeš da biraš kolone
    });
  
    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
  
}
