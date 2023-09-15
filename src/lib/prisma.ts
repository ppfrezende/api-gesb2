import { _env } from '@/env';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: _env.NODE_ENV === 'dev' ? ['query'] : [],
});
