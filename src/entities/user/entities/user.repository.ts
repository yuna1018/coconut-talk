import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private dataSource: DataSource) {}

  async findUser(userId: string) {
    return await this.dataSource
      .getRepository(User)
      .findOne({ where: { userId: userId } });
  }

  async findAllUsers() {
    return await this.dataSource.getRepository(User).find();
  }

  async createUser(userData) {
    return await this.dataSource.getRepository(User).save(userData);
  }
}
