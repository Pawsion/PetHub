import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CreateReservationDto } from './createReservation.dto';
import { ReservationService } from './reservations.service';
import { UpdateReservationDto } from './updateReservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.createReservation(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationService.getAllReservations();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reservationService.getReservationById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.updateReservation(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reservationService.deleteReservation(+id);
  }
}
