import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FlakeyApiInterceptor } from '../../../flakey-api.interceptor';
import {
  AllUserResponseContract,
  CreateUserContract,
  UserResponseDto,
} from '../dto/user.contracts';
import { UserModel } from '../../../entities/user.model';
import { UserService } from '../service/user.service';
import { uuid } from 'uuidv4';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: AllUserResponseContract })
  @Get()
  @UseInterceptors(new FlakeyApiInterceptor(0.9))
  async findAll(): Promise<AllUserResponseContract> {
    const users = await this.userService.findAll();

    return {
      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
    };
  }

  @ApiCreatedResponse({ type: AllUserResponseContract })
  @ApiBadRequestResponse()
  @UseInterceptors(new FlakeyApiInterceptor(0.3))
  @Post()
  async create(@Body() payload): Promise<UserResponseDto> {
    const user = await this.userService.newUser({
      id: uuid(),
      name: payload.name,
      email: payload.email,
    } as UserModel);

    const newUser = await this.userService.newUser(user).catch((err) => {
      throw new Error(err);
    });

    return newUser;
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Delete(':id')
  @ApiNotFoundResponse()
  @ApiNoContentResponse()
  async remove(@Param('id') id: string): Promise<void> {
    await this.userService.remove(id);
    return;
  }
}
