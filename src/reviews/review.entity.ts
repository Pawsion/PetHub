import { Kennel } from 'src/kennels/kennels.entity';
import { User } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check } from 'typeorm';


@Entity('reviews')
@Check('rating BETWEEN 1 AND 5')
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Kennel, kennel => kennel.reviews, { nullable: true })
  kennel: Kennel;

  @Column({ type: 'int'})
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
