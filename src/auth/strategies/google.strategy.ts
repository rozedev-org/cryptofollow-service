import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { AuthService } from '../services/auth.service';
import config from '@app/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    const { google, baseUrl } = config();
    super({
      clientID: google.clientId,
      clientSecret: google.clientSecret,
      callbackURL: `${baseUrl}/api/cryptofollow-service/v1/auth/google/redirect`,
      scope: ['email', 'profile'],
      failureRedirect: `${baseUrl}/api/cryptofollow-service/v1/auth/google/failure`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;

    let user = await this.authService.existsUser(emails[0].value);

    if (!user) {
      user = await this.authService.signup({
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        password: '',
      });
    }

    const payload = {
      id: user.id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, payload);
  }
}
