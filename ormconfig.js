export const type = 'postgres';
export const host = 'db'; // This should match the service name in docker-compose.yml
export const port = process.env.POSTGRES_PORT;
export const username = process.env.POSTGRES_USER;
export const password = process.env.POSTGRES_PASSWORD;
export const database = process.env.POSTGRES_DB;
export const synchronize = true;
export const logging = false;
export const entities = [
  'src/entity/**/*.ts'
];
export const migrations = [
  'src/migration/**/*.ts'
];
export const subscribers = [
  'src/subscriber/**/*.ts'
];
export const cli = {
  entitiesDir: 'src/entity',
  migrationsDir: 'src/migration',
  subscribersDir: 'src/subscriber'
};
