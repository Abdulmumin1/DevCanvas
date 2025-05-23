// import { setContext } from 'svelte';
import { writable } from 'svelte/store';
// import {}
export let showSave = writable(false);
export let saved_spinner = writable(false);
export let showLoginToSave = writable(false);
export let showForkTosave = writable(false);
export let canvasConfig = writable({});
export let canvasTags = writable({});
export let dummyTitle = writable('Hover Animation');
export let babelActive = writable(false);
export let typescriptActive = writable(false);
export let formatCode = writable(false);
export let tabsView = writable(true);
// export let setFormatCode =
function appendJSONToFormData(json, formData, which) {
	for (const key in json) {
		if (which === key || which === true) {
			const value = json[key];
			const d = (value !== null && typeof value === 'object') ? JSON.stringify(value) : value;
			formData.append(key, d);
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
		// console.log('full');
	} else {
		// Handle save failed
		// console.log('failed');
	}
	saved_spinner.set(false);
	showSave.set(false);
}



export async function saveSingle(supabase, content, name, id) {
	
	try {
		const { data, error: err } = await supabase.from('htmlPlayground').update([{[name]: content}]).eq('id', id);
	} catch (e) {
		console.error(e)
	}
	saved_spinner.set(false);
	// showSave.set(false);
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
		// console.log('plugin saved');
	} else {
		// Handle save failed
		// console.log('failed');
	}
}
export async function saveConfig(json_data, id) {
	let formData = new FormData();
	saved_spinner.set(true);
	// showSave.set(true);
	formData.append('config', JSON.stringify(json_data));
	formData.append('id', id);
	const response = await fetch('?/update', {
		method: 'POST',
		body: formData
	});
	if (response.ok) {
		// Handle save success
		// console.log('config saved');
	} else {
		// Handle save failed
		// console.log('failed');
	}
}

export async function saveTags(json_data, id) {
	let formData = new FormData();
	saved_spinner.set(true);
	// showSave.set(true);
	formData.append('tags', JSON.stringify(json_data));
	formData.append('id', id);
	const response = await fetch('?/update', {
		method: 'POST',
		body: formData
	});
	if (response.ok) {
		// Handle save success
		// console.log('Tags saved');
	} else {
		// Handle save failed
		// console.log('failed');
	}
}

export let layoutView = writable('left');
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
export let sassActive = writable(false);
export let userImportedJS = writable([]);

export const jsPlugins = writable({
	animejs: false,
	gsap: false,
	motionone: false,
	threejs: false,
	velocity: false,
	popmotion: false,
	scrollreveal: false
});

export const editorConfig = {
	automaticLayout: true,
	renderIndentGuides: false,
	tabSize: 2,
	formatOnPaste: true,
	fontFamily: '"Monolisa", Menlo, "Source Code Pro", monospace',
	fontSize: 15,
	emmet: {
		enabled: true // Enable Emmet support
	},
	minimap: { enabled: false }
	// ...(window.innerWidth <= 600 && { fontSize: 11, wordWrap: 'on' })
};
