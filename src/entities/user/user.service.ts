import { Injectable } from '@nestjs/common';
import { UserRepository } from './entities/user.repository';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export type loginValidation = {
  isValidUser: boolean;
  isValidPassWord: boolean;
  userInfo: Omit<User, 'password' | 'id'>;
};

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async findAllUsers() {
    return await this.userRepository.findAllUsers();
  }

  async findUser(userId) {
    return await this.userRepository.findUser(userId);
  }

  async createUser(userData: User) {
    const saltOrRounds = +this.configService.get('SALT_OR_ROUNDS');
    userData.password = await bcrypt.hash(userData.password, saltOrRounds);
    return await this.userRepository.createUser(userData);
  }

  async validateUser(userLoginInfo): Promise<loginValidation> {
    const { userId, password } = userLoginInfo;
    const result = <loginValidation>{
      isValidUser: true,
      isValidPassWord: false,
    };

    const user = await this.userRepository.findUser(userId);
    result.userInfo = plainToInstance(User, user);

    if (!user) {
      result.isValidUser = false;
      return result;
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      return result;
    }

    result.isValidPassWord = true;
    return result;
  }
}
