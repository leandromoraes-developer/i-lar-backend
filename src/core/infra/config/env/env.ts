import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_BASE_URL: z.string(),
  AWS_SECRET_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3333),
});

export type Env = z.infer<typeof envSchema>;
