// import { Injectable, Inject } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// // import { Strategy, ExtractJwt } from 'passport-jwt';
// import { ConfigType } from '@nestjs/config';
// import config from '../../config';
// // import { PayloadToken } from '../models/token.model';
// import { Request } from 'express';
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   //   constructor(
//   //     @Inject(config.KEY) private configService: ConfigType<typeof config>,
//   //   ) {
//   //     super({
//   //       jwtFromRequest: ExtractJwt.fromExtractors([extractJWTFromCookie]),
//   //       ignoreExpiration: false,
//   //       secretOrKey: configService.jwtSecret,
//   //     });
//   //   }
//   //   async validate(payload: PayloadToken) {
//   //     return payload;
//   //   }
//   // }
//   // function extractJWTFromCookie(req: Request): string | null {
//   //   if (req.cookies && req.cookies.Authentication) {
//   //     return req.cookies.Authentication;
//   //   }
//   //   return null;
// }
