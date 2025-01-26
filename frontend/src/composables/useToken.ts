export function useToken() {
	const { item: token } = useLocalStorageItem(
		"token",
		zod.string(),
	);

	return {
		token,
	};
}
