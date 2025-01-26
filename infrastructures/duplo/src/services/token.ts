import { envs } from "envs";
import jwt from "jsonwebtoken";
import { idType } from "domains/types/commonType";
import { ZodAccelerator, type ZodSpace } from "@duplojs/core";
import { typeToZodSchema } from "@utils/typeToZodSchema";

const tokenContentSchema = zod.object({
	userId: typeToZodSchema(idType),
});

const tokenContentSchemaBuilder = ZodAccelerator.build(tokenContentSchema);

export type TokenContent = ZodSpace.infer<typeof tokenContentSchema>;

export class TokenService {
	public static make(content: TokenContent): string {
		return jwt.sign(
			content,
			envs.SECRET,
			{ expiresIn: envs.EXPIRES_IN },
		);
	}

	public static check(token = "") {
		try {
			const data = jwt.verify(
				token,
				envs.SECRET,
			);

			const content = tokenContentSchemaBuilder.parse(data);

			return content;
		} catch {
			return null;
		}
	}
}
