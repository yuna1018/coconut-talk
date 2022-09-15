import { Module } from '@nestjs/common';
import { TypeOrmConfigService } from './typeOrmConfig.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
  ],
  providers: [TypeOrmConfigService],
  exports: [TypeOrmConfigService],
})
export class TypeOrmConfigModule {}
