import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalAuthStrategy } from './strategy/local-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTAuthStrategy } from './strategy/jwt-auth.strategy';
import { EnvConfig } from 'src/common/config/env.config';
import { JWTCookieUtil } from 'src/common/utils/jwt-cookie.utils';
import { JWTRefreshAuthStrategy } from './strategy/jwt-refresh-auth.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalAuthStrategy,
    JWTAuthStrategy,
    JWTRefreshAuthStrategy,
    EnvConfig,
    JWTCookieUtil,
  ],
})
export class AuthModule {}
