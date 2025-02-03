import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    databaseURL: process.env.DATABASE_URL,
    appPort: process.env.PORT,
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL,
    frontendRedirectUrl: process.env.FRONTEND_REDIRECT_URL,
    postmant: {
      host: process.env.POSTMAN_HOST,
      apiKey: process.env.POSTMAN_API_KEY,
      collectionId: process.env.POSTMAN_COLLECTION_ID,
      onUpdatePostmanCollection:
        process.env.ON_UPDATE_POSTMAN_COLLECTION === 'true',
    },
    binance: {
      host: process.env.BINANCE_HOST,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  };
});
