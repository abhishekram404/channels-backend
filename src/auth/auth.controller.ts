import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/shared/decorators/public-route';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignupDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  signin(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Public()
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    await this.authService.signup(body);
    return 'Signup successful. An OTP has been send to your registered email.';
  }
}
