import { type User } from "@prisma/client";
import userData from "./data/user.json";
import { makeUser } from "./entities/user";

function mapAsync<
	A, F extends((value: A, index: number) => Promise<unknown>),
>(arr: A[], callback: F): Promise<Awaited<ReturnType<F>>[]> {
	return Promise.all<Awaited<ReturnType<F>>>(
		arr.map((value, index) => callback(value, index) as never),
	);
}

await mapAsync(
	userData.users,
	async(user) => {
		await makeUser(user as User);
	},
);
