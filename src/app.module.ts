import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SittersModule } from './sitters/sitters.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { User } from './users/users.entity';
import { KennelsModule } from './kennels/kennels.module';
import { PetsModule } from './pets/pets.module';
import { Kennel } from './kennels/kennels.entity';
import { Pet } from './pets/pets.entity';
import { Reservation } from './reservations/reservation.entity';
import { Payment } from './payments/payment.entity';
import { Review } from './reviews/review.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',  // tvoj username
      password: 'root',  // tvoja šifra
      database: 'pethoteldb',  // ime tvoje baze
      entities: [User, Kennel, Pet, Reservation, Payment, Review],
      synchronize: true,  // Samo za razvoj, nemoj koristiti u produkciji
    }),
    ConfigModule.forRoot(),
    UsersModule,
    SittersModule,
    ReservationsModule,
    PaymentsModule,
    ReviewsModule,
    KennelsModule,
    PetsModule,
    AuthModule,
  ],
})
export class AppModule {}
