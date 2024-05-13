import { Body, Controller, Delete, Get, NotFoundException, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FlakeyApiInterceptor } from '../../../flakey-api.interceptor';
import { AllUserResponseContract, CreateUserContract, UserResponseDto } from '../dto/user.contracts';
import { UserService } from '../service/user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: AllUserResponseContract })
  @Get()
  @UseInterceptors(new FlakeyApiInterceptor(0.9))
  async findAll(): Promise<AllUserResponseContract> {
    return await this.userService.findAllAndFormat();
  }

  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiBadRequestResponse()
  @UseInterceptors(new FlakeyApiInterceptor(0.3))
  @Post()
  async create(@Body() payload: CreateUserContract): Promise<UserResponseDto> {
    const user = await this.userService.createUser(payload);
    return user;
  }

  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.getById(id);
  }

  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.removeUser(id);
  }
}
