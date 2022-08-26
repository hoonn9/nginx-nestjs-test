import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WhitelistGuard } from './guards/whitelist.guard';

@Module({
  imports: [ConfigModule.forRoot({})],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: WhitelistGuard,
    },
  ],
})
export class AppModule {}
