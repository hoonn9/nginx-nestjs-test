import { SetMetadata } from '@nestjs/common';
import { NetworkEnv } from './whitelist.types';

export const WHITELIST_KEY = 'whitelist';
export const Whitelist = (...envs: NetworkEnv[]) =>
  SetMetadata(WHITELIST_KEY, envs);
