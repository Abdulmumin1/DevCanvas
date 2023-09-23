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

export let layoutView = writable('left');
