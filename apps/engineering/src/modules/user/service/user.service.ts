import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../../entities/user.model';
import { v4 as uuidv4 } from 'uuid';
import { AllUserResponseContract, CreateUserContract } from '../dto/user.contracts';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async findAllAndFormat(): Promise<AllUserResponseContract> {
    const users = await this.userRepository.find();
    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));

    return { data: formattedUsers };
  }

  async getById(id: string): Promise<UserModel> {
    const user = await this.userRepository.findOne({where: {id}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(payload: CreateUserContract): Promise<UserModel> {
    const newUser = this.userRepository.create({
      id: uuidv4(),
      ...payload,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }

  async removeUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
