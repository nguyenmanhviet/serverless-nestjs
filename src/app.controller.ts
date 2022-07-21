import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('alo');
    return this.appService.getHello();
  }

  @Get('/users')
  getUser() {
    return [
      {
        userName: 'Viet',
        age: 22,
      },
    ];
  }
}
