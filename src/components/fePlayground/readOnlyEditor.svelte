<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

	let editorContainer;
	let editor;
	export let lang;
	export let code;

	let editorConfig;
	let monacoModel;

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
		// self.MonacoEnvironment = {
		// 	getWorker: function (_moduleId, label) {
		// 		return new editorWorker();
		// 	}
		// };
		import('monaco-editor').then((monaco) => {
			monacoModel = monaco;
			monacoModel.editor.defineTheme('myTheme', {
				base: 'vs-dark',
				inherit: true,
				rules: [
					{
						token: 'comment',
						foreground: '#5c6370' // Comment color
					},
					{
						token: 'string',
						foreground: '#98c379' // String color
					},
					{
						token: 'keyword',
						foreground: '#c678dd' // Keyword color
					},
					{
						token: 'tag',
						foreground: '#e06c75' // HTML tag color
					},
					{
						token: 'attribute.name',
						foreground: '#abb2bf' // HTML attribute name color
					},
					{
						token: 'attribute.value',
						foreground: '#36A0D8' // HTML attribute value color
					},
					{}
					// Add more rules as needed to match the Ayu Dark theme
				],
				colors: {
					'editor.foreground': '#abb2bf',
					'editor.background': '#0e0e0e',
					'editorCursor.foreground': '#38bef7',
					'editor.lineHighlightBackground': '#0e0e0e50',
					'editorLineNumber.foreground': '#38bef7',
					'editor.selectionBackground': '#38BEF710',
					'editor.inactiveSelectionBackground': '#38BEF720'
				}
			});
			// Use monaco here...
			// Initialize the editor
			editor = monacoModel.editor.create(editorContainer, editorConfig);
			monacoModel.editor.setTheme('myTheme');
		});
	});
</script>

<div class="w-full h-full py-2 bg-primary" bind:this={editorContainer} />
