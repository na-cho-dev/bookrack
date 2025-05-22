import { JwtService } from '@nestjs/jwt';
import { EnvConfig } from '../config/env.config';
import { TokenPayload } from 'src/auth/interface/token-payload.interface';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class JWTCookieService {
  constructor(
    private envConfig: EnvConfig,
    private jwtService: JwtService,
  ) {}

  private cookieOptions(maxAge?: number) {
    return {
      httpOnly: true,
      secure: this.envConfig.getEnv('NODE_ENV') === 'production',
      sameSite: 'strict' as const,
      maxAge,
    };
  }

  async signToken(
    payload: TokenPayload,
    type: 'access' | 'refresh' = 'access',
  ) {
    const secret =
      type === 'access'
        ? this.envConfig.getEnv('JWT_ACCESS_TOKEN_SECRET')
        : this.envConfig.getEnv('JWT_REFRESH_TOKEN_SECRET');

    const expiresIn =
      type === 'access'
        ? `${this.envConfig.getEnv('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`
        : `${this.envConfig.getEnv('JWT_REFRESH_TOKEN_EXPIRATION_MS')}ms`;

    return await this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }

  setAuthCookie(
    res: Response,
    token: string,
    type: 'access' | 'refresh' = 'access',
  ) {
    const cookieType = type === 'access' ? 'Authentication' : 'Refresh';
    const maxAge =
      type === 'access'
        ? parseInt(this.envConfig.getEnv('JWT_ACCESS_TOKEN_EXPIRATION_MS'))
        : parseInt(this.envConfig.getEnv('JWT_REFRESH_TOKEN_EXPIRATION_MS'));

    res.cookie(cookieType, token, this.cookieOptions(maxAge));
  }

  clearAuthCookie(res: Response) {
    res
      .clearCookie('Authentication', this.cookieOptions())
      .clearCookie('Refresh', this.cookieOptions());
  }
}
