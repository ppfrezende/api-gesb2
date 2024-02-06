import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_DEFAULT_REGION: z.string(),
  AWS_BUCKET_NAME: z.string(),
});

export const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid enviroment variables', _env.error.format());

  throw new Error('Invalid enviroment variables');
}

export const env = _env.data;
