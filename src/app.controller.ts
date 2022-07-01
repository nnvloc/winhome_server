import { Controller, Get, Res, Logger} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  private readonly logger = new Logger(AppController.name);

  @Get('/')
  index() {
    return 'Hello word';
  }

  @Get('/testing')
  testing(@Res() res) {
    const data = this.appService.getHello();
    return res.json({
      success: true,
      data,
    });
  }
}
