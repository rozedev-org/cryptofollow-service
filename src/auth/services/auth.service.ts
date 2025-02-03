import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '@app/users/dto/user.dto';
import { UserRole } from '@prisma/client';
import { PayloadToken } from '../models/token.model';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !user.isEnabled) {
      return null;
    }
    if (isMatch) {
      user.loginTries = 0;
      await this.userService.update(
        { id: user.id },
        { loginTries: 0, isEnabled: true },
      );
      return user;
    } else {
      user.loginTries += 1;
      if (user.loginTries > 3) {
        user.isEnabled = false;
      }
      await this.userService.update(
        { id: user.id },
        { loginTries: user.loginTries, isEnabled: user.isEnabled },
      );
      return null;
    }
  }

  public generateToken(userId: number, role: UserRole, expiresIn: Date) {
    const payload: PayloadToken = {
      sub: userId,
      expiresIn,
      role,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }

  async validateToken(token: string) {
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '');
      const verify = this.jwtService.verify(tokenWithoutBearer);
      const user = await this.userService.findOne({ id: verify.sub });

      return { user, expiresIn: verify.expiresIn };
    } catch (e) {
      throw new UnauthorizedException('not allow');
    }
  }

  async existsUser(email: string) {
    try {
      const user = await this.userService.findByEmail({ email });
      return user;
    } catch (e) {
      return null;
    }
  }

  async signup(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
