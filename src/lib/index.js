// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';
import existingKeys from '$lib/data.json';
export let code_data = writable({
	abc: {
		code: 'lfjfldsflaf',
		lang: 'python'
	}
});

export const current_key = writable({});

export async function loadJson(url) {
	try {
		const response = await import(url);
		const jsonData = await response;
		return jsonData;
	} catch (error) {
		console.error('Error loading JSON:', error);
		throw error;
	}
}

export function generateRandomKey() {
	// Define the characters to be used in the random key
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const keyLength = 6; // You can adjust the length of the key as per your requirement

	let randomKey;
	let keyExists;

	// Generate a random key until it doesn't exist in the data object

	do {
		randomKey = '';
		for (let i = 0; i < keyLength; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			randomKey += characters[randomIndex];
		}

		keyExists = existingKeys.hasOwnProperty(randomKey);
	} while (keyExists);

	return randomKey;
}

export function getLastPartOfUrl(url) {
	const parts = url.split('/');
	return parts[parts.length - 1];
}

export function saveToLocalStorage(itemsArray) {
	localStorage.setItem('owner', JSON.stringify(itemsArray));
}

export function getFromLocalStorage() {
	try {
		const savedItems = JSON.parse(localStorage.getItem('owner'));
		return savedItems;
	} catch {
		return [];
	}
}
