import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../../entities/user/user.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserInfo } from '../../common/decorators/user.decorator';
import { User } from '../../entities/user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('user')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllUsers() {
    return await this.userService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param() userId: string) {
    return await this.userService.findUser(userId);
  }

  @Post()
  async createUser(@Body() userData: User) {
    return await this.userService.createUser(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@UserInfo() user: User) {
    return this.authService.login(user);
  }
}
