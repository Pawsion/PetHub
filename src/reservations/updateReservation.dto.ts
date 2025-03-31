export class UpdateReservationDto {
    start_date: Date;
    end_date: Date;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  }
  