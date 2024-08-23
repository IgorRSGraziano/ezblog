import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

(async () => {
  const users = await prisma.user.count();
  if (users > 0) return;

  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      passwordDigest: crypto.createHash('md5').update('admin').digest('hex'),
    },
  });
})();
