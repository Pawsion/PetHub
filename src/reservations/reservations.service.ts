import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './createReservation.dto';
import { UpdateReservationDto } from './updateReservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(dto: CreateReservationDto): Promise<Reservation> {
    const reservation = this.reservationRepository.create(dto);
    return this.reservationRepository.save(reservation);
  }

  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async getReservationById(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({ where: { reservation_id: id } });

    if (!reservation) { 
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    return reservation;
  }

  async updateReservation(id: number, dto: UpdateReservationDto): Promise<Reservation> {
    await this.getReservationById(id); 

    await this.reservationRepository.update(id, dto);
    return this.getReservationById(id);
  }

  async deleteReservation(id: number): Promise<void> {
    const result = await this.reservationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
  }
}
