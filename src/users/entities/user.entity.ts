import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { Exclude } from 'class-transformer';
export class UserEntity implements UserModel {
  constructor({ id, email, firstName, lastName, password }: UserModel) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @Exclude()
  password: string;
}
