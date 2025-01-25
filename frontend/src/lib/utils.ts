import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function setLocalStorageItem(key: string, value: unknown): void {
	try {
		const serializedValue = JSON.stringify(value);
		localStorage.setItem(key, serializedValue);
	} catch {
		throw new Error("Error setting local storage item");
	}
}

export function getLocalStorageItem<T>(key: string): T | null {
	try {
		const serializedValue = localStorage.getItem(key);
		if (serializedValue === null) {
			return null;
		}
		return JSON.parse(serializedValue) as T;
	} catch {
		return null;
	}
}

export function removeLocalStorageItem(key: string): void {
	localStorage.removeItem(key);
}
