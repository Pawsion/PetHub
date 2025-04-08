import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {

  private verificationCodes: Map<string, string>;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    this.verificationCodes = new Map();
  }

  async register(email: string, password: string) {
    const existingUser = await this.userRepository.findOne({ where: { email: email } });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({email, password_hash: hashedPassword});
    await this.userRepository.save(newUser);

    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.user_id };
        return {access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET })};
  }
  async getMe(userId: number) {
    const user = await this.userRepository.findOne({
      where: { user_id: userId },
      select: ['user_id', 'email'],
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  }
  async forgotPassword(dto: ForgotPasswordDto) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.verificationCodes.set(dto.email, code);
    await this.mailService.sendResetPasswordCode(dto.email, code);
    return { message: 'Verification code sent to email.' };
  }

  async verifyCode(dto: VerifyCodeDto) {
    const code = this.verificationCodes.get(dto.email);
    if (code !== dto.code) {
      throw new UnauthorizedException('Invalid code');
    }
    return { message: 'Code is valid.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const code = this.verificationCodes.get(dto.email);
    if (code !== dto.code) {
      throw new UnauthorizedException('Invalid code');
    }
  
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const hashed = await bcrypt.hash(dto.newPassword, 10);
    user.password_hash = hashed;
    await this.userRepository.save(user);
  
    this.verificationCodes.delete(dto.email);
    return { message: 'Password successfully changed.' };
  }
}
