import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { OrNeverType } from '../../utils/types/or-never.type';
import { AllConfigType } from 'src/config/config.type';
import { JwtPayloadType } from './types/jwt-payload.type';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-cookie',
) {
  constructor(private configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtCookieStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get('auth.secret', { infer: true }),
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (
      req.cookies &&
      'accessToken' in req.cookies &&
      req.cookies.accessToken.length > 0
    ) {
      return req.cookies.accessToken;
    }
    return null;
  }
  public validate(payload: JwtPayloadType): OrNeverType<JwtPayloadType> {
    console.log('>>>>', payload);
    if (!payload.id) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
