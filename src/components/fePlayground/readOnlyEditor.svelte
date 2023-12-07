<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import * as monaco from 'monaco-editor';

	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	import { currentTheme } from '$lib/utils/utils.js';

	let editorContainer;
	let editor;
	export let lang;
	export let code;

	let editorConfig;

	if (browser) {
		editorConfig = {
			readOnly: true,
			automaticLayout: true,
			renderIndentGuides: false,
			tabSize: 1,
			formatOnPaste: true,
			emmet: {
				enabled: true // Enable Emmet support
			},
			minimap: { enabled: false },
			...(window.innerWidth <= 600 && { fontSize: 12, wordWrap: 'on' })
		};
	}

	onMount(async () => {
		self.MonacoEnvironment = {
			getWorker: function (_, label) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};
		editor = monaco.editor.create(editorContainer, editorConfig);
		monaco.editor.defineTheme('newTheme', currentTheme);
		// Use monaco here...
		// Initialize the editor
		// editor = monaco.editor.create(editorContainer, editorConfig);
		monaco.editor.setTheme('newTheme');
		let model = monaco.editor.createModel(code, lang);

		editor.setModel(model);
	});
</script>

<div class="w-full h-full py-2 bg-[#0b0e14]" bind:this={editorContainer} />
