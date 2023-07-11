import 'dotenv/config';

export const appConfig = {
    port: process.env.APP_PORT,
    socketPort: +process.env.SOCKET_PORT,
    bitmapAnnouncementUrl: process.env.BITMAP_ANNOUNCEMENT_URL,
    bitmapSocketUrl: process.env.BITMAP_SOCKET_URL,
    isProd: process.env.NODE_ENV === "production",
}

export const databaseConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    logging: process.env.DB_LOGGING === "true",
}