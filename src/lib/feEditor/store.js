import { writable } from 'svelte/store';

export let showSave = writable(false);
export let saved_spinner = writable(false);
export let showLoginToSave = writable(false);
export let showForkTosave = writable(false);
function appendJSONToFormData(json, formData, which) {
	for (const key in json) {
		if (which == key || which == true) {
			formData.append(key, json[key]);
		}
	}
	formData.append('id', json['id']);
}

export async function saveData(json_data, which = true) {
	let formData = new FormData();

	saved_spinner.set(true);
	// showSave.set(true);
	appendJSONToFormData(json_data, formData, which);

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
	showSave.set(false);
}

export async function savePlugins(json_data, id) {
	let formData = new FormData();

	saved_spinner.set(true);
	// showSave.set(true);

	formData.append('plugins', JSON.stringify(json_data));
	formData.append('id', id);
	const response = await fetch('?/update', {
		method: 'POST',
		body: formData
	});

	if (response.ok) {
		// Handle save success
		console.log('plugin saved');
	} else {
		// Handle save failed
		console.log('failed');
	}
}

export let layoutView = writable('left');
export let showModal = writable(false);
export let showEmbedModal = writable(false);

export let externalStuff = writable({ html: '', css: '' });
export let javascriptStuff = writable({ main: '' });
export let jsChanged = writable(false);
export let showjsConsole = writable(false);
export let consoleOutput = writable([]);
export const cssPlugins = writable({
	tailwind: false,
	bootstrap: false,
	fontawesome: false,
	materialicons: false,
	googlefonts: false,
	bulma: false
});

export const jsPlugins = writable({
	animejs: false,
	gsap: false,
	motionone: false,
	threejs: false,
	velocity: false,
	popmotion: false,
	scrollreveal: false
});
