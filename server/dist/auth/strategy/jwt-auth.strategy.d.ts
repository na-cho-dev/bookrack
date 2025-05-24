import { Strategy } from 'passport-jwt';
import { TokenPayload } from '../interface/token-payload.interface';
import { UserService } from 'src/user/user.service';
import { EnvConfig } from 'src/common/config/env.config';
declare const JWTAuthStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JWTAuthStrategy extends JWTAuthStrategy_base {
    private readonly userService;
    constructor(envConfig: EnvConfig, userService: UserService);
    validate(payload: TokenPayload): Promise<import("mongoose").Document<unknown, {}, import("../../user/schemas/user.schema").UserDocument, {}> & import("../../user/schemas/user.schema").User & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
export {};
