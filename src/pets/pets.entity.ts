import { Reservation } from 'src/reservations/reservation.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  pet_id: number;

  @ManyToOne(() => User, user => user.pets, { onDelete: 'CASCADE' })
  user: User;

  @Column({ length: 100 })
  name: string;

//   @Column({ type: 'enum', enum: ['dog', 'cat', 'other'] })
//   type: 'dog' | 'cat' | 'other';

  @Column({ length: 100, nullable: true })
  breed: string;

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'text', nullable: true })
  medical_notes: string;

  @OneToMany(() => Reservation, reservations => reservations.user)
  reservations: Reservation[];

  @CreateDateColumn()
  created_at: Date;
}