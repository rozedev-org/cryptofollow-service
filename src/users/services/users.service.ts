import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FindByIdDto } from '@app/dtos/generic.dto';
import { PrismaService } from '@app/database/prisma.service';
import { CreateUserDto, FindByEmailDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existsUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existsUser) {
      throw new BadRequestException(`User ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return new UserEntity(newUser);
  }

  async findAll() {
    return (await this.prisma.user.findMany()).map(
      (user) => new UserEntity(user),
    );
  }

  async findOne({ id }: FindByIdDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return new UserEntity(user);
  }

  async update({ id }: FindByIdDto, updateUserDto: UpdateUserDto) {
    await this.findOne({ id });

    const updatedUser: UserEntity = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });

    return updatedUser;
  }

  async remove({ id }: FindByIdDto) {
    await this.findOne({ id });
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return new UserEntity(deletedUser);
  }

  async findByEmail({ email }: FindByEmailDto): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    return user;
  }
}
