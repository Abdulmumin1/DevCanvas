// place files you want to import through the `$lib` alias in this folder.
import { readable, writable } from 'svelte/store';
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
export const dashboardLoading = writable(true);
export const SnippetsDescription = readable({
	name: 'Snippets',
	des: 'Snippets is an open-source platform for sharing and collaborating on code snippets. It provides a simple and intuitive interface for developers to share, discover, and discuss code snippets across various programming languages and use cases.',
	url: 'https://snippet-bice.vercel.app',
	imageUrl: 'https://raw.githubusercontent.com/Abdulmumin1/snippets/main/static/snippetsPreview.png'
});

export const saved_spinner = writable(false);

export const pageCount = writable(0);
export const pageLimit = writable(3);

export const showToast = writable(false);
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

export const goto = (path) => {
	window.location.href = path;
};
