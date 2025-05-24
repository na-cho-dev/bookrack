import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interface/token-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvConfig } from 'src/common/config/env.config';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTRefreshAuthStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    envConfig: EnvConfig,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies.Refresh,
      ]),
      secretOrKey: envConfig.getEnv('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request.cookies.Refresh;

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    const user = this.authService.verifyUserRefreshToken(
      refreshToken,
      payload.sub,
    );

    return user;
  }
}
