import {
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LocalAuthenticationGuard } from '../guards/localAuthentication.guard';
import { Request, Response } from 'express';
import { UserEntity } from '@app/users/entities/user.entity';
import config from '@app/config';
import { ConfigType } from '@nestjs/config';
import { JwtAuthGuard } from '../guards/jwt-authentication.guard';
import { DateTime } from 'luxon';
import { LoginDto } from '../dtos/auth.dto';
import { AuthGuard } from '@nestjs/passport';
interface RequestWithUser extends Request {
  user: UserEntity;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;

    const dt = DateTime.now().plus({
      seconds: Number(this.configService.jwtExpirationTime),
    });

    const expiresIn = dt.toJSDate();
    const token = this.authService.generateToken(user.id, user.role, expiresIn);

    response
      .cookie('Authentication', token, {
        httpOnly: true,
        secure: this.configService.nodeEnv === 'production',
        sameSite: this.configService.nodeEnv === 'production' ? 'none' : 'lax',
        expires: expiresIn,
      })
      .json({
        user,
        expiresIn,
      });
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('validate')
  async validate(@Req() req: Request) {
    const cookie = req.headers.cookie;
    if (!cookie) {
      throw new Error('No cookies found');
    }

    const authCookie = cookie
      .split(';')
      .find((c) => c.trim().startsWith('Authentication'));

    if (!authCookie) {
      throw new UnauthorizedException('Authentication cookie not found');
    }

    const token = authCookie.split('=')[1];

    return await this.authService.validateToken(token);
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Req() request: Request, @Res() response: Response) {
    response.clearCookie('Authentication').json({ message: 'Logout' });
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // El flujo será manejado automáticamente por Passport.
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleLoginRedirect(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    const { user } = request;

    const dt = DateTime.now().plus({
      seconds: Number(this.configService.jwtExpirationTime),
    });
    const expiresIn = dt.toJSDate();
    const token = this.authService.generateToken(user.id, user.role, expiresIn);

    response
      .cookie('Authentication', token, {
        httpOnly: true,
        secure: this.configService.nodeEnv === 'production',
        sameSite: this.configService.nodeEnv === 'production' ? 'none' : 'lax',
        expires: expiresIn,
      })
      .redirect(this.configService.frontendRedirectUrl as string);
  }

  @Get('google/failure')
  googleFailure(@Res() res: Response) {
    res.status(401).json({
      message: 'La autenticación con Google ha fallado.',
    });
  }
}

//http://localhost:8000/api/cryptofollow-service/v1/auth/google
