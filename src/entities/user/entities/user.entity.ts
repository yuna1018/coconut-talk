import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50, unique: true, comment: '유저 아이디' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @Column('varchar', { length: 200, comment: '유저 비밀번호' })
  @IsString()
  @IsNotEmpty()
  @Exclude()
  password: string;

  @Column('varchar', { length: 100, comment: '유저 이메일' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column('varchar', { length: 50, comment: '유저 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column('varchar', { length: 50, unique: true, comment: '유저 닉네임' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
