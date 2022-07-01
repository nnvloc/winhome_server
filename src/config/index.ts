export default () => ({
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  SENDGRID_SENDER: process.env.SENDGRID_SENDER,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  API_KEY: process.env.API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10) || 3000,
  database: {
    extra: process.env.TYPEORM_DRIVER_EXTRA || null,
    url: process.env.TYPEORM_URL || process.env.DATABASE_URL || '',
    connection: process.env.TYPEORM_CONNECTION || 'posgres',
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    name: process.env.TYPEORM_DATABASE,
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    subscribers: process.env.TYPEORM_SUBSCRIBERS,
  }
});
