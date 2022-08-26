export enum NetworkEnvEnum {
  Local = 'Local',
  Internal = 'Internal',
  Specific = 'Specific',
}

export type NetworkEnv = keyof typeof NetworkEnvEnum;
