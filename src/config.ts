import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    databaseURL: process.env.DATABASE_URL,
    appPort: process.env.PORT,
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV,
    postmanCollectionId: process.env.POSTMAN_COLLECTION_ID,
    postmanApiKey: process.env.POSTMAN_API_KEY,
    onUpdatePostmanCollection:
      process.env.ON_UPDATE_POSTMAN_COLLECTION === 'true',
  };
});
