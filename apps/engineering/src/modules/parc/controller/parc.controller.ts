import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FlakeyApiInterceptor } from '../../../flakey-api.interceptor';
import { AllParcResponseContract, ParcRequestContract, ParcResponseDto } from '../dto/parc.contracts';
import { ParcService } from '../service/parc.service';
import { ParcModel } from 'apps/engineering/src/entities/parc.model';

@ApiTags('parcs')
@Controller('parcs')
export class ParcController {
  constructor(private readonly parcService: ParcService) {}

  @ApiOkResponse({ type: AllParcResponseContract })
  @Get()
  async findAll(): Promise<AllParcResponseContract> {
    return await this.parcService.findAllAndFormat();
  }

  @ApiCreatedResponse({ type: ParcResponseDto })
  @ApiBadRequestResponse()
  @Post()
  async create(@Body() payload: ParcRequestContract): Promise<ParcModel> {
    console.log('Payload:', payload); // Log the payload
    return await this.parcService.createParc(payload);
  }

  @ApiOkResponse({ type: ParcResponseDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  @UseInterceptors(new FlakeyApiInterceptor(0.7))
  async getParc(@Param('id') id: string): Promise<ParcResponseDto> {
    return await this.parcService.getById(id);
  }

  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.parcService.removeParc(id);
  }
}
