import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParcModel } from '../../../entities/parc.model';
import { v4 as uuidv4 } from 'uuid';
import { AllParcResponseContract, ParcRequestContract } from '../dto/parc.contracts';

@Injectable()
export class ParcService {
  constructor(
    @InjectRepository(ParcModel)
    private readonly parcRepository: Repository<ParcModel>,
  ) {}

  async findAllAndFormat(): Promise<AllParcResponseContract> {
    const parcs = await this.parcRepository.find();
    const formattedParcs = parcs.map((parc) => ({
      id: parc.id,
      name: parc.name,
      description: parc.description,
    }));

    return { data: formattedParcs };
  }

  async getById(id: string): Promise<ParcModel> {
    const parc = await this.parcRepository.findOne({where: {id}});
    if (!parc) {
      throw new NotFoundException('Parc not found');
    }
    return parc;
  }

  async createParc(payload: ParcRequestContract): Promise<ParcModel> {
    try {
      const newParc = this.parcRepository.create(payload);
      await this.parcRepository.save(newParc);
      return newParc;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeParc(id: string): Promise<void> {
    const result = await this.parcRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Parc not found');
    }
  }
}
