import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './createPayment.dto';
import { UpdatePaymentDto } from './updatePayment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { payment_id: id } });

    if (!payment) {
        throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
}

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    await this.paymentRepository.update(id, updatePaymentDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
