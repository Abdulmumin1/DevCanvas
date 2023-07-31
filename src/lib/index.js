// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';
import existingKeys from '$lib/data.json';
export let code_data = writable({
	abc: {
		code: 'lfjfldsflaf',
		lang: 'python'
	}
});

export const current_data = writable({});
export const user = writable(false);
export const previewMode = writable(true);

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

/** Dispatch event on click outside of node */
export function clickOutside(node) {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
