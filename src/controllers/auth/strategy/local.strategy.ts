import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../../entities/user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'userId',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  async validate(userId: string, password: string) {
    const userLoginInfo = { userId, password };
    const user = await this.userService.validateUser(userLoginInfo);
    if (!user.isValidUser) {
      //아이디나 비밀번호가 맞지 않습니다.
      console.log('아이디 ㄴㄴ');
      return false;
    }

    if (!user.isValidPassWord) {
      //아이디나 비밀번호가 맞지 않습니다.
      console.log('pass ㄴㄴ');
      return false;
    }
    return user;
  }
}
