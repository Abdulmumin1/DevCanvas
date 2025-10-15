<!-- <script>
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
			// renderIndentGuides: false,
			// tabSize: 1,
			// formatOnPaste: true,

			minimap: { enabled: false },
			// wordWrap: 'on',
			fontSize: 13,
			...(window.innerWidth <= 600 && { fontSize: 12 })
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

<div class="w-full h-full py-2 bg-[#0b0e14]" bind:this={editorContainer} /> -->

<script>
	import { EditorView } from '@codemirror/view';
	import { basicSetup } from 'codemirror';
	import { EditorState } from '@codemirror/state';
	import { javascript } from '@codemirror/lang-javascript'; // Or other language extension
	import { html } from '@codemirror/lang-html'; // Or other language extension
	import { css } from '@codemirror/lang-css'; // Or other language extension
	import { createTheme } from '$lib/config/editorTheme.js';

	// import { onDark } from '@codemirror/theme-one-dark';
	import { onMount } from 'svelte';
	import { coolGlow } from 'thememirror';

	// ... (reactive state and logic for the editor)

	let editorView;
	let container;

	export let code;
	export let lang;

	const langFunction = () => {
		if (lang == 'html') {
			return html();
		} else if (lang == 'css') {
			return css();
		} else {
			return javascript();
		}
	};

	onMount(() => {
		//   const container = document.querySelector('.codemirror-editor'); // Select container element
		const fixedHeightEditor = EditorView.theme({
			'&': { height: '100%' },
			// '.cm-content, .cm-gutter': { minHeight: '100%' },
			'.cm-scroller': { overflow: 'auto' },
			'.cm-content': { 'margin-bottom': '100px' }
		});

		let cTheme = createTheme();
		editorView = new EditorView({
			parent: container,
			doc: `${code}`, // Bind the initial code40
			extensions: [
				EditorState.readOnly.of(true),
				basicSetup,
				fixedHeightEditor,
				langFunction(),
				cTheme
			] // Extensions
		});
	});
</script>

<div bind:this={container} style="height: 100%;" />

<!-- <style></style> -->

<style>
	/* Hide horizontal scrollbar */
	*::-webkit-scrollbar {
		height: 0; /* Chrome, Safari */
	}

	/* Hide scrollbar for IE and Edge */
	* {
		-ms-overflow-style: none; /* IE and Edge */
	}

	/* Hide horizontal scrollbar (Firefox) */
	* {
		scrollbar-height: none; /* Firefox */
	}
</style>
