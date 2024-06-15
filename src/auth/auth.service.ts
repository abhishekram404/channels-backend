import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
    };
  }
}
