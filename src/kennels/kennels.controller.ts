import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    // @Get()
    // async findAll(): Promise<Kennel[]>{
    //     return await this.kennelsService.findAll();
    // }
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
