export default class Environment {
  static isClient(): boolean {
    return typeof window !== 'undefined';
  }

  static isDevelopment(env: string): boolean {
    if (!env) {
      return true;
    }

    return env === 'development' || env === 'dev' || env === 'develop' || env === 'local';
  }

  static isStaging(env: string): boolean {
    if (!env) {
      return false;
    }

    return env === 'staging';
  }

  static isProduction(env: string): boolean {
    if (!env) {
      return false;
    }

    return env === 'production' || env === 'prod';
  }
}
