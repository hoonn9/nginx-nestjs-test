import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { whitelistMap } from './whitelist.constants';
import { WHITELIST_KEY } from './whitelist.decorator';
import { NetworkEnv } from './whitelist.types';

@Injectable()
export class WhitelistGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const list = this.reflector.getAllAndOverride<NetworkEnv[] | undefined>(
      WHITELIST_KEY,
      [context.getHandler(), context.getClass()],
    );

    const ctx = GqlExecutionContext.create(context).getContext();
    const req: Request = ctx.req;
    console.log(req.rawHeaders);
    console.log(req?.ip);
    if (list) {
      for (const env of list) {
        return whitelistMap[env].some((pattern) => {
          if (typeof pattern === 'string') return pattern === req.ip;
          return pattern.test(req.ip);
        });
      }
    }

    return true;
  }
}
