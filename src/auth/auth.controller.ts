import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
  @Get('google')
    @UseGuards(AuthGuard('google'))
    googleLogin() {
        return { message: 'Redirecting to Google...' };
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    googleRedirect(@Req() req) {
        return {
            message: 'Google login successful',
            user: req.user,
        };
    }
    @Post('forgot-password')
    forgot(@Body() dto: ForgotPasswordDto) {
      return this.authService.forgotPassword(dto);
    }
    
    @Post('verify-code')
    verify(@Body() dto: VerifyCodeDto) {
      return this.authService.verifyCode(dto);
    }
    
    @Post('reset-password')
    reset(@Body() dto: ResetPasswordDto) {
      return this.authService.resetPassword(dto);
    }
}
