// import { Reservation } from 'src/reservations/reservation.entity';
// import { Review } from 'src/reviews/review.entity';
// import { User } from 'src/users/users.entity';
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';

// @Entity('sitters')
// export class Sitter {
//   @PrimaryGeneratedColumn()
//   sitter_id: number;

//   @ManyToOne(() => User, user => user.sitters, { onDelete: 'CASCADE' })
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @Column({ type: 'text', nullable: true })
//   description: string;

//   @Column({ type: 'int', nullable: true })
//   experience_years: number;

//   @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
//   hourly_rate: number;

//   @Column({ type: 'json', nullable: true })
//   availability: any;

//   @Column({ type: 'varchar', length: 255, nullable: true })
//   profile_picture: string;

//   @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
//   rating: number;

//   @Column({ type: 'int', default: 0 })
//   reviews_count: number;

//   @OneToMany(() => Reservation, reservation => reservation.sitter)
//   reservations: Reservation[];

//   @OneToMany(() => Review, review => review.sitter)
//   reviews: Review[];

//   @CreateDateColumn()
//   created_at: Date;
// }
