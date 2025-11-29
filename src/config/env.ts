import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.SECRET_KEY;
