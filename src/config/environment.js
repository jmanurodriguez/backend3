import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const loadEnvironment = () => {
  let envFile = '.env';
  
  if (process.env.NODE_ENV === 'test') {
    envFile = '.env.test';
  } else if (process.env.NODE_ENV === 'production') {
    envFile = '.env.production';
  }

  const envPath = path.resolve(__dirname, '../..', envFile);
  
  const result = dotenv.config({ path: envPath });
  
  if (result.error && process.env.NODE_ENV !== 'production') {
    console.warn(`Warning: Could not load ${envFile} file`);
    dotenv.config({ path: path.resolve(__dirname, '../..', '.env') });
  }
};

loadEnvironment();

export const config = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/db_example?directConnection=true',
  mongoDbName: process.env.MONGO_DB_NAME || 'db_example',
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  uploadDir: process.env.UPLOAD_DIR || './src/public/img',
  logLevel: process.env.LOG_LEVEL || 'info'
};
