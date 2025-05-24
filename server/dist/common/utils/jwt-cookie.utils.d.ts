import { JwtService } from '@nestjs/jwt';
import { EnvConfig } from '../config/env.config';
import { TokenPayload } from 'src/auth/interface/token-payload.interface';
import { Response } from 'express';
export declare class JWTCookieUtil {
    private envConfig;
    private jwtService;
    constructor(envConfig: EnvConfig, jwtService: JwtService);
    private cookieOptions;
    signToken(payload: TokenPayload, type?: 'access' | 'refresh'): Promise<string>;
    setAuthCookie(res: Response, token: string, type?: 'access' | 'refresh'): void;
    clearAuthCookie(res: Response): void;
}
