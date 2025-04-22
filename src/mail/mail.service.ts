import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordCode(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Password Code',
      template: 'reset-password',
      context: {
        code,
      },
    });
  }
}
