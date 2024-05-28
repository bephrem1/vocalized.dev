export default class Environment {
  static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  static isDevelopment(env: string): boolean {
    return env === 'development' || env === 'dev' || env === 'develop' || env === 'local';
  }

  static isStaging(env: string): boolean {
    return env === 'staging';
  }

  static isProduction(env: string): boolean {
    return env === 'production' || env === 'prod';
  }
}
