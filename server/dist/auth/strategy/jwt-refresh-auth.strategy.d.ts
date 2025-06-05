import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { TokenPayload } from '../interface/token-payload.interface';
import { EnvConfig } from 'src/common/config/env.config';
import { AuthService } from '../auth.service';
declare const JWTRefreshAuthStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JWTRefreshAuthStrategy extends JWTRefreshAuthStrategy_base {
    private readonly authService;
    constructor(envConfig: EnvConfig, authService: AuthService);
    validate(request: Request, payload: TokenPayload): Promise<{
        email: string;
        name: string;
        password: string;
        globalRole: "admin" | "staff" | "user";
        _id: unknown;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }>;
}
export {};
