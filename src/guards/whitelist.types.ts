export enum NetworkEnvEnum {
  Local = 'Local',
  Internal = 'Internal',
}

export type NetworkEnv = keyof typeof NetworkEnvEnum;
