import { ApiProperty } from '@nestjs/swagger';
import { User as UserModel, UserRole } from '@prisma/client';
import { Exclude } from 'class-transformer';
export class UserEntity implements UserModel {
  constructor(partial: Partial<UserModel>) {
    Object.assign(this, partial);
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

  @ApiProperty({
    enum: UserRole,
    enumName: 'Role',
  })
  role: UserRole;
}
