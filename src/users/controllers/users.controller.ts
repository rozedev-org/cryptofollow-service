import { JwtAuthGuard } from '@app/auth/guards/jwt-authentication.guard';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { DefaultErrorResponse } from '@app/interfaces/error.interface';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

import { Roles } from '@app/auth/decorators/roles.decorator';
import { RolesGuard } from '@app/auth/guards/roles.guard';
import { UserRole } from '@prisma/client';
@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
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
