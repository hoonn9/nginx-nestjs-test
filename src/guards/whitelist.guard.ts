import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { whitelistMap } from './whitelist.constants';
import { WHITELIST_KEY } from './whitelist.decorator';
import { NetworkEnv } from './whitelist.types';

@Injectable()
export class WhitelistGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const list = this.reflector.getAllAndOverride<NetworkEnv[] | undefined>(
      WHITELIST_KEY,
      [context.getHandler(), context.getClass()],
    );

    const ctx = GqlExecutionContext.create(context).getContext();
    const req: Request = ctx.req;

    if (process.env.NODE_ENV !== 'production') {
      return true;
    }

    if (list) {
      const ip = this.getClientIP(req);
      if (!ip) {
        return false;
      }

      for (const env of list) {
        if (env === 'Specific') {
          const ips = this.getSpecificIps();

          if (ips) {
            return ips.some((pattern) => {
              return pattern === ip;
            });
          }
        } else {
          return whitelistMap[env].some((pattern: string | RegExp) => {
            if (typeof pattern === 'string') return pattern === ip;
            return pattern.test(ip);
          });
        }
      }
    }

    return true;
  }

  private getSpecificIps() {
    const ips = this.configService.get<string>('SPECIFIC_IPS');
    if (ips) {
      return ips.split(',').map((ip) => ip.trim());
    }
    return null;
  }

  private getClientIP(req: Request) {
    if (process.env.NODE_ENV === 'production') {
      return this.getProxyClientIP(req);
    }
    return req.ip;
  }

  private getProxyClientIP(req: Request) {
    const ips = req.headers['x-forwarded-for']
      ?.toString()
      .split(',')
      .map((ip) => ip.trim());

    if (ips?.length && ips.length > 1) {
      return ips[ips.length - 2];
    }

    return null;
  }
}
