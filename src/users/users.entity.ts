import { Kennel } from 'src/kennels/kennels.entity';
import { Pet } from 'src/pets/pets.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { Review } from 'src/reviews/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 255, nullable: true})
  full_name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 20, nullable: true })
  phone_number: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 255, nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  googleId: string;

//   @Column({ type: 'enum', enum: ['owner', 'sitter', 'admin'] })
//   user_type: 'owner' | 'sitter' | 'admin';

  @OneToMany(() => Pet, pet => pet.user)
  pets: Pet[];

  @OneToMany(() => Kennel, kennel => kennel.owner)
  kennels: Kennel[]; 

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @CreateDateColumn()
  created_at: Date;
}
