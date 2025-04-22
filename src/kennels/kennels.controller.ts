import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateKennelDto } from './createKennel.dto';
import { Kennel } from './kennels.entity';
import { KennelsService } from './kennels.service';
import { UpdateKennelDto } from './updateKennel.dto';

@Controller('kennels')
export class KennelsController {
    constructor(private readonly kennelsService: KennelsService){}

    @Post('create')
    async create(@Body() dto: CreateKennelDto): Promise<Kennel>{
        return await this.kennelsService.create(dto);
    }
    @Get()
async findAll(
    @Query('location') location?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy: 'price_per_night' | 'name' | 'created_at' = 'price_per_night',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.kennelsService.findAll(location, minPrice, maxPrice, page, limit, sortBy, sortOrder);
  }

    
    // @Get(':id')
    // async findOne(@Body() id: number): Promise<Kennel>{
    //     return await this.kennelsService.findOne(id);
    // }

    // @Put(':id')
    // async update(@Param(`id`) id: number, @Body() dto: UpdateKennelDto): Promise<Kennel>{
    //     return await this.kennelsService.update(id, dto);
    // }

    // @Delete()
    // async delete(@Body() id: number): Promise<Kennel>{
    //     return await this.kennelsService.delete(id);
    // }
}
