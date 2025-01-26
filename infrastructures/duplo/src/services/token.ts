import { envs } from "envs";
import jwt from "jsonwebtoken";
import { type User } from "@prisma/client";

export interface TokenContent {
	userId: string;
	role: User["role"];
}

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
			const { content } = jwt.verify(
				token,
				envs.SECRET,
			) as jwt.JwtPayload;

			if (!content) {
				throw new Error("Missing content AccessToken");
			}

			return content as TokenContent;
		} catch {
			return null;
		}
	}
}
