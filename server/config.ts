import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env / .env.local
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  environment: process.env.NODE_ENV || 'development',
  dataDir: path.resolve(process.cwd(), 'data'),
};
