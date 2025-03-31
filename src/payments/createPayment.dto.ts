export class CreatePaymentDto {
    user_id: number;
    reservation_id: number;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
  }
  