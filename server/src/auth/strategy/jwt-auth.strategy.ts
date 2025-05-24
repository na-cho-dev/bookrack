import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../interface/token-payload.interface';
import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EnvConfig } from 'src/common/config/env.config';

@Injectable()
export class JWTAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    envConfig: EnvConfig,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies.Authentication,
      ]),
      secretOrKey: envConfig.getEnv('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const user = this.userService.getUser({ _id: payload.sub });
    if (!user) {
      throw new UnauthorizedException('Permission Denied');
    }
    // console.log(user);

    return user;
  }
}
