import { ConfigService } from '@nestjs/config';
export declare class EnvConfig {
    private readonly configService;
    constructor(configService: ConfigService);
    getEnv(key: string, defaultValue?: string): string;
}
