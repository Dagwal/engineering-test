import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../../entities/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async findAll(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  async getById(id: string): Promise<UserModel> {
    return await this.userRepository.createQueryBuilder().select().where('id = :id', {id}).getOne();
  }

  async newUser(user: UserModel): Promise<UserModel> {
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
