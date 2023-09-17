<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import { showSave, saveData, showLoginToSave } from '$lib/feEditor/store.js';
	import { current_data, isOwner, saved_spinner, darkModeState } from '$lib/index.js';
	import { browser } from '$app/environment';
	import Fa from 'svelte-fa';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	let editorContanier;
	let editor;
	let loading = true;
	export let lang = 'css';

	// Define the initial code content
	export let initialCSS = `/* css here */`;
	let editorConfig;
	let monacoModel;
	if (browser) {
		editorConfig = {
			value: initialCSS,
			language: lang,
			automaticLayout: true,
			renderIndentGuides: false,
			emmet: {
				enabled: true // Enable Emmet support
			},
			minimap: { enabled: false },
			...(window.innerWidth <= 600 && { fontSize: 11, wordWrap: 'on' })
		};
	}

	let saved = true;
	let typingTimer; // Timer to track typing
	const delay = 1000; // Adjust the delay as needed (in milliseconds)

	// Function to handle text input
	function handleAutoSave() {
		clearTimeout(typingTimer); // Clear the previous timer

		typingTimer = setTimeout(function () {
			// This function will run after the delay (user has stopped typing)
			save();
		}, delay);
	}

	async function save() {
		saved = false;
		saved_spinner.set(true);
		if (verifyUser()) {
			saveData($current_data, 'css');
		}
		saved = true;
		saved_spinner.set(false);
		showSave.set(true);
	}

	// Define your save function
	function saveDocument() {
		if (saved) {
			save();
		}
	}

	function verifyUser() {
		if ($isOwner) {
			showSave.set(true);
			return true;
		}
	}
	function handleContentChange(data) {
		verifyUser();
		current_data.update((cur) => {
			// console.log(cur);
			return { ...cur, css: data };
		});
		handleAutoSave();
	}

	function setEditorTheme() {
		const theme = $darkModeState ? 'myTheme' : 'vs-code'; // Adjust theme names accordingly

		// Set the theme in Monaco Editor
		try {
			monacoModel.editor.setTheme(theme);
		} catch (error) {
			console.log(error);
		}
	}

	onMount(async () => {
		self.MonacoEnvironment = {
			getWorker: function (_moduleId, label) {
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
			setEditorTheme();
			// Initialize the editor
			editor = monacoModel.editor.create(editorContanier, editorConfig);
			// Register the HTML language with Monaco Editor
			monacoModel.languages.register({
				id: 'html'
			});

			// Import and configure the emmet-monaco-es package
			import('emmet-monaco-es').then((emmet) => {
				const dispose = emmet.emmetCSS(
					// monaco-editor it self. If not provided, will use window.monaco instead.
					// This could make the plugin support both ESM and AMD loaded monaco-editor
					monacoModel
					// languages needs to support html markup emmet, should be lower case.
				);
			});

			// Format the HTML code
			var formatAction = editor.getAction('editor.action.formatDocument');
			formatAction.run().then(function () {
				// The code has been formatted
				console.log('document formated');
			});
			// if ($darkModeState) {
			// 	monaco.editor.setTheme('myTheme');
			// }
			// Attach an event listener for changes in the code
			editor.onDidChangeModelContent(() => {
				try {
					// console.log(editor.getValue());
					handleContentChange(editor.getValue());
				} catch {
					console.log('err');
				}
			});
			var saveAction = {
				id: 'saveAction',
				label: 'Save',
				keybindings: [
					monacoModel.KeyMod.CtrlCmd | monacoModel.KeyCode.KeyS // Ctrl + S
				],
				precondition: null,
				keybindingContext: null,
				contextMenuGroupId: 'navigation',
				contextMenuOrder: 1.5,
				run: function (ed, editor, context) {
					// Prevent the default browser behavior (e.g., save dialog)
					// Define the behavior of the save action here
					saveDocument(); // Call your save function here
				}
			};

			// // Register a completion item provider for HTML
			// monaco.languages.registerCompletionItemProvider('html', {
			// 	provideCompletionItems: (model, position) => {
			// 		return {
			// 			suggestions: customTags(monaco)
			// 		};
			// 	}
			// });

			editor.addAction(saveAction);
		});

		window.addEventListener('resize', () => {
			if (editor) {
				editor.layout();
			}
		});
		loading = false;

		return () => {
			editor.dispose();
		};
	});
	// Cleanup when the component is destroyed
	onDestroy(() => {
		// Dispose of the editor to prevent memory leaks
		if (editor) {
			editor.dispose();
		}
	});

	afterUpdate(() => {
		setEditorTheme();
	});
</script>

{#if loading}
	<div class="h-full flex justify-center items-center">
		<Fa icon={faSpinner} class="animate-spin text-2xl" />
	</div>
{:else}
	<div class="editor-container h-full bg-primary w-full" class:bg-secondary-dark={$darkModeState}>
		<div class="h-full w-full" bind:this={editorContanier} />
	</div>
{/if}

<style>
	/* Set the height of the editor container */
	.editor-container {
		height: 100%;
		width: 100%;
	}
</style>
