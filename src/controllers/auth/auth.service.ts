import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user) {
    const payload = { user: user.userInfo, role: 'user' };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
