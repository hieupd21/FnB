import { z } from 'zod';

const schema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
});

const config = schema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

if (!config.success) {
  console.error(config.error.errors);
  throw new Error('Invalid environment variable declarations');
}

const envConfig = config.data;

export default envConfig;
