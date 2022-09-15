import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../../entities/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const time: string =
          configService.get('NODE_ENV') !== 'production' ? '1y' : '60s';
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: time },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...AuthModule.strategies],
})
export class AuthModule {
  static get strategies() {
    return [LocalStrategy, JwtStrategy];
  }
}
