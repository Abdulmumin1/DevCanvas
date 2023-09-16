// place files you want to import through the `$lib` alias in this folder.
import { readable, writable } from 'svelte/store';

export const darkModeState = writable(false);
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
export const isOwner = writable(false);

export const pageCount = writable(6);
export const pageLimit = writable(3);

export const showToast = writable(false);
export function generateRandomKey() {
	// Define the characters to be used in the random key
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const keyLength = 6; // You can adjust the length of the key as per your requirement

	let randomKey;

	// Generate a random key
	randomKey = '';
	for (let i = 0; i < keyLength; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomKey += characters[randomIndex];
	}

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

function appendJSONToFormData(json, formData, which) {
	for (const key in json) {
		if (which == key || which == true) {
			formData.append(key, json[key]);
		}
	}
	formData.append('id', json['id']);
}

export async function saveData(json_data, all = true) {
	let formData = new FormData();

	saved_spinner.set(true);
	previewMode.set(false);
	appendJSONToFormData(json_data, formData, all);

	const response = await fetch('?/update', {
		method: 'POST',
		body: formData
	});

	if (response.ok) {
		// Handle save success
		console.log('full');
	} else {
		// Handle save failed
		console.log('failed');
	}
	saved_spinner.set(false);
	previewMode.set(true);
}

export const supportedLanguages = [
	'javascript',
	'python',
	'html',
	'css',
	'java',
	'ruby',
	'swift',
	'typescript',
	'csharp',
	'php',
	'go',
	'rust',
	'kotlin',
	'sql',
	'shell/bash',
	'json',
	'yaml',
	'markdown',
	'xml',
	'r',
	'perl',
	'objective-c',
	'dart',
	'scala',
	'haskell',
	'lua',
	'matlab',
	'powershell',
	'groovy',
	'coffeescript',
	'elixir',
	'fsharp',
	'vb.net',
	'crystal',
	'julia',
	'typescriptreact',
	'jsx',
	'kotlinandroid',
	'swiftios',
	'matlab',
	'matlabsession',
	'ini',
	'toml',
	'perl6',
	'swiftpm',
	'yaml',
	'diff',
	'http',
	'makefile',
	'rubyirb',
	'docker',
	'raku',
	'rspec',
	'http',
	'haskellcabal',
	'apacheconf',
	'nginx',
	'smalltalk',
	'cmake',
	'webassembly',
	'glsl',
	'shellsession',
	'shell',
	'plaintext',
	'c',
	'cpp'
].sort();

export function copyTextToClipboard(text) {
	if (!navigator.clipboard) {
		// Fallback for browsers that do not support the Clipboard API
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed'; // Ensure it's off-screen
		document.body.appendChild(textArea);
		textArea.select();

		try {
			const successful = document.execCommand('copy');
			const message = successful ? 'Copied to clipboard' : 'Unable to copy to clipboard';
			alert(message);
		} catch (err) {
			console.error('Error copying text: ', err);
		} finally {
			document.body.removeChild(textArea);
		}
	} else {
		// Use the Clipboard API if available
		navigator.clipboard
			.writeText(text)
			.then(() => {
				console.log('Text copied to clipboard');
			})
			.catch((err) => {
				console.error('Error copying text: ', err);
			});
	}
}
