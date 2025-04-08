import { Reservation } from 'src/reservations/reservation.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User; 

  @OneToOne(() => Reservation)
  @JoinColumn()
  reservation: Reservation;a

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'failed'], default: 'pending' })
  status: string;

  @CreateDateColumn()
  payment_date: Date; 
}
