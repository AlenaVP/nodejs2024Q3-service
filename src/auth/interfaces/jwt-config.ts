interface JWTConfig {
  accessExpireTime: string | number;
  refreshExpireTime: string | number;
  accessSecret: string;
  refreshSecret: string;
}
