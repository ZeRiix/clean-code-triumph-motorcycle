export function useToken() {
	const { item: token } = useLocalStorageItem(
		"token",
		zod.string().nullable(),
	);

	return {
		token,
	};
}
