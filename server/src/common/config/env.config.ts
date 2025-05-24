import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfig {
  constructor(private readonly configService: ConfigService) {}

  getEnv(key: string, defaultValue?: string): string {
    const envValue = this.configService.get(key) || defaultValue;

    if (envValue === undefined) {
      throw new Error(`Missing Environment Variable: ${key}`);
    }

    return envValue;
  }
}
