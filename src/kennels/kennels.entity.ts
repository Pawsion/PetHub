import { Reservation } from 'src/reservations/reservation.entity';
import { Review } from 'src/reviews/review.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Kennel {
  @PrimaryGeneratedColumn()
  kennel_id: number;

  @ManyToOne(() => User, user => user.kennels, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_night: number;

  @Column()
  max_capacity: number;

  @Column({ default: 0 })
  current_capacity: number;

  @Column({ length: 255, nullable: true })
  image_url: string;

  @OneToMany(() => Reservation, reservations => reservations.kennel)
  reservations: Reservation[];

  @OneToMany(() => Review, review => review.kennel)
  reviews: Review[];

  @CreateDateColumn()
  created_at: Date;
}