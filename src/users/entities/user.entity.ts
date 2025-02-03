import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { Exclude } from 'class-transformer';
export class UserEntity implements UserModel {
  constructor({
    id,
    email,
    firstName,
    lastName,
    password,
    picture,
  }: UserModel) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.picture;
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

  @ApiProperty()
  loginTries: number;

  @ApiProperty()
  isEnabled: boolean;

  @ApiProperty()
  picture: string;
}
