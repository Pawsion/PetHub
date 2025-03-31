import { Kennel } from 'src/kennels/kennels.entity';
import { Payment } from 'src/payments/payment.entity';
import { Pet } from 'src/pets/pets.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, JoinColumn, OneToOne } from 'typeorm';


@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @ManyToOne(() => User, user => user.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Pet, pet => pet.reservations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @ManyToOne(() => Kennel, kennel => kennel.reservations, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'kennel_id' })
  kennel: Kennel;

//   @ManyToOne(() => Sitter, sitter => sitter.reservations, { nullable: true, onDelete: 'SET NULL' })
//   @JoinColumn({ name: 'sitter_id' })
//   sitter: Sitter;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' })
  status: string;

  @Column({ type: 'datetime' })
  start_date: Date;

  @Column({ type: 'datetime' })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Payment, payment => payment.reservation)
  payment: Payment;
}
