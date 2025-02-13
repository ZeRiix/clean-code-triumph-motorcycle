import { z } from "zod";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({
	path: import.meta.dirname,
});

export const envs = z.object({
	MONGO_DATABASE_URL: z.string(),
	SECRET: z.string(),
	EXPIRES_IN: z.string(),
})
	.parse(process.env);
