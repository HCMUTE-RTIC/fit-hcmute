import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWarning(): string {
    return this.appService.getWarning();
  }

  @Get('docs')
  getDocs(): string {
    return this.appService.getDocs();
  }
}
