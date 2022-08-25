import { NetworkEnv } from './whitelist.types';

export const whitelistMap: Record<NetworkEnv, (string | RegExp)[]> = {
  Local: ['127.0.0.1'],
  Internal: ['127.0.0.1', /192.168.[0-9]{1,3}.[0-9]{1,3}(:[0-9]{1,5})?/g],
};
