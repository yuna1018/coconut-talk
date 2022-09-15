import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './modules/database/typeOrmConfig.module';
import { AuthModule } from './controllers/auth/auth.module';
import { UserModule } from './entities/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: AppModule.isDevelopment() ? '.dev.env' : '.env',
    }),
    TypeOrmConfigModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {
  public static isDevelopment(): boolean {
    return process.env.NODE_ENV !== 'production';
  }
}
