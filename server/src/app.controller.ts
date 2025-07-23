import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @ApiOperation({
    summary: 'API Info',
    description: 'Get general information about the BookRack API.',
  })
  info() {
    return {
      name: 'BookRack API',
      description: 'A modern library management system API.',
      docs: '/api-docs',
      health: '/api/health',
      version: this.appService.health().version,
      environment: this.appService.health().environment,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('/health')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Get health and status of the BookRack API.',
  })
  @ApiResponse({ status: 200, description: 'Health status object.' })
  health() {
    return this.appService.health();
  }
}
