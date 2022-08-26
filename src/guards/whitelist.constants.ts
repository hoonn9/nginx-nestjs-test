export const whitelistMap: Record<'Local' | 'Internal', (string | RegExp)[]> = {
  Local: ['127.0.0.1'],
  Internal: ['127.0.0.1', /192.168.[0-9]{1,3}.[0-9]{1,3}(:[0-9]{1,5})?/g],
};
