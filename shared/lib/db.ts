import { PrismaClient } from "@/prisma/generated/prisma/client/client";

import { PrismaLibSql } from "@prisma/adapter-libsql";

const databaseUrl = process.env.DATABASE_URL ?? "file:./dev.db";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaLibSql({ url: databaseUrl }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;