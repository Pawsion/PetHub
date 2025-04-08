import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(userId: number): Promise<CreateUserDto> {
    const user = await this.usersRepository.findOne({where: {user_id: userId}});
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
