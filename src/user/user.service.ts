import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(user) {
    const newUser = this.userRepository.create(user);

    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find();
  }
}
