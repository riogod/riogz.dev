import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { OrNeverType } from '../../utils/types/or-never.type';
import { AllConfigType } from 'src/config/config.type';
import { Request as RequestType } from 'express';
import {JwtRefreshPayloadType} from "./types/jwt-refresh-payload.type";

@Injectable()
export class JwtRefreshCookieStrategy extends PassportStrategy(Strategy, 'jwt-refresh-cookie') {
  constructor(private configService: ConfigService<AllConfigType>) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtRefreshCookieStrategy.extractJWT,
          ExtractJwt.fromAuthHeaderAsBearerToken()]),
      secretOrKey: configService.get('auth.refreshSecret', { infer: true }),
    });
  }

  private static extractJWT(req: RequestType): string | null {
    if (
        req.cookies &&
        'refreshToken' in req.cookies &&
        req.cookies.refreshToken.length > 0
    ) {
      return req.cookies.refreshToken;
    }
    return null;
  }
  public validate(payload: JwtRefreshPayloadType): OrNeverType<JwtRefreshPayloadType> {

    if (!payload.sessionId) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
