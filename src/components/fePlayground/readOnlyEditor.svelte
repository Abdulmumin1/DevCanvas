<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import { currentTheme } from '$lib/utils/utils.js';

	let editorContainer;
	let editor;
	export let lang;
	export let code;

	let editorConfig;

	if (browser) {
		editorConfig = {
			value: code,
			language: lang,
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
			getWorker: function (_moduleId, label) {
				return new editorWorker();
			}
		};
		import('monaco-editor').then((monaco) => {
			try {
				monaco.editor.defineTheme('newTheme', currentTheme);
				// Use monaco here...
				// Initialize the editor
				editor = monaco.editor.create(editorContainer, editorConfig);
				monaco.editor.setTheme('newTheme');
			} catch (err) {}
		});
	});
</script>

<div class="w-full h-full py-2 bg-[#0b0e14]" bind:this={editorContainer} />
