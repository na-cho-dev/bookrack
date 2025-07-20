import { Injectable } from '@nestjs/common';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
  health(): Record<string, any> {
    // Read package.json from the project root
    const pkgPath = path.join(process.cwd(), 'package.json');
    let version = 'unknown';
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
      version = pkg.version;
    } catch (e) {
      // fallback or log error
    }

    return {
      status: 'OK',
      service: 'BookRack API',
      version,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      hostname: os.hostname(),
      platform: process.platform,
      memory: {
        rss: process.memoryUsage().rss,
        heapTotal: process.memoryUsage().heapTotal,
        heapUsed: process.memoryUsage().heapUsed,
        external: process.memoryUsage().external,
      },
      cpuCount: os.cpus().length,
    };
  }
}