import { MailerService } from '@nestjs-modules/mailer';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { generateRandomString } from 'src/shared/utils/generateRandomString';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignupDto } from './dto/sign-up.dto';
import { OtpVerification } from './entity/otp-verification.entity';

@Injectable()
export class AuthService {
  otpExpireTimeInMins = +process.env.OTP_EXPIRE_TIME_MINS || 15;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(OtpVerification)
    private readonly otpVerificationRepository: Repository<OtpVerification>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signIn(credentials: SignInDto) {
    const { username, password } = credentials;
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    if (!user) throw new UnauthorizedException('Username not registered.');

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      throw new UnauthorizedException('Password is incorrect.');

    if (!user.isEmailVerified) {
      throw new BadRequestException({
        message: 'Email verification needed.',
        actionNeeded: 'EMAIL_VERIFICATION',
      });
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
    };
  }

  async signup(user: SignupDto) {
    const { email, username } = user;

    const doesUserAlreadyExist = await this.userRepository.existsBy({ email });

    if (doesUserAlreadyExist)
      throw new BadRequestException(
        'Email is already registered. Please login.',
      );

    const isUsernameTaken = await this.userRepository.existsBy({
      username,
    });
    if (isUsernameTaken)
      throw new BadRequestException(
        'Username is not available. Please choose a different one.',
      );

    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);

    const otpCode = await generateRandomString(6);
    const otpHash = await bcrypt.hash(otpCode, 10);
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + this.otpExpireTimeInMins);

    const otp = this.otpVerificationRepository.create({
      user: newUser,
      otpHash,
      expiredAt: expiryDate,
    });

    await this.otpVerificationRepository.save(otp);

    this.mailerService.sendMail({
      to: email,
      text: `Your verification OTP for Channels is ${otpCode}. The code will expire in ${this.otpExpireTimeInMins} minutes.`,
    });

    return newUser;
  }
}
