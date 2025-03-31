export class CreateReservationDto {
    user_id: number;
    pet_id: number;
    kennel_id: number;
    start_date: Date;
    end_date: Date;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  }