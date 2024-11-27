import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { UserEntity } from '../entities/user.entity';
import { DefaultErrorResponse } from '@app/interfaces/error.interface';

@ApiTags('Users')
@ApiResponse({ status: '4XX', type: DefaultErrorResponse })
@ApiResponse({ status: '5XX', type: DefaultErrorResponse })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOkResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param() params: FindByIdDto) {
    return this.usersService.findOne(params);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param() params: FindByIdDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param() params: FindByIdDto) {
    return this.usersService.remove(params);
  }
}
