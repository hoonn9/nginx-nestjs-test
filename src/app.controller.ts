import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

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
      domain: '*.elb.amazonaws.com',
    });
    // return this.appService.getHello();
  }
}
