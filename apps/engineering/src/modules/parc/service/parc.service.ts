import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParcModel } from '../../../entities/parc.model';

@Injectable()
export class ParcService {
  constructor(
    @InjectRepository(ParcModel)
    private readonly parcRepository: Repository<ParcModel>,
  ) {}

  async findAll(): Promise<ParcModel[]> {
    return await this.parcRepository.find();
  }

  async getById(id: string): Promise<ParcModel> {
    return await this.parcRepository.createQueryBuilder().select().where('id = :id', {id}).getOne();
  }

  async newUser(user: ParcModel): Promise<ParcModel> {
    return await this.parcRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.parcRepository.delete(id);
  }
}
