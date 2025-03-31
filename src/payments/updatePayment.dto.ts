export class UpdatePaymentDto {
    amount: number;
    status: 'pending' | 'completed' | 'failed';
  }