import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { Whitelist } from './guards/whitelist.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Req() req: Request,
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    res.cookie('jwt', 'jwttestvalue', {
      httpOnly: true,
      secure: true,
    });
    return this.appService.getHello();
  }

  @Whitelist('Specific')
  @Get('user')
  getUser() {
    return 'user';
  }
}
