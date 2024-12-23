<script>
	import { faL, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { afterUpdate, onMount } from 'svelte';
	import {
		current_data,
		previewMode,
		user,
		saved_spinner,
		saveData,
		darkModeState
	} from '$lib/index.js';
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
	export let lang = 'javascript';

	// Define the initial code content
	export let initialCode = `function greet(name) {
	return 'Hello, ' + name + '!';
}`;
	let editorConfig;
	let monacoModel;
	if (browser) {
		editorConfig = {
			value: initialCode,
			language: lang,
			automaticLayout: true,
			formatOnPaste: true,
			emmet: {
				enabled: true // Enable Emmet support
			},
			renderIndentGuides: false,
			minimap: { enabled: false },
			...(window.innerWidth <= 600 && { fontSize: 12, wordWrap: 'on' })
		};
	}

	// Define a custom action for saving

	// Register the save action
	// editor.addAction(saveAction);
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
		saveData($current_data, 'code');
		saved = true;
		saved_spinner.set(false);
		previewMode.set(true);
	}

	// Define your save function
	function saveDocument() {
		if (saved) {
			save();
		}
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

	function verifyUser() {
		try {
			if ($user.id == $current_data.user_id) {
				previewMode.set(false);
				return true;
			} else {
				console.log('lier');
				return false;
			}
		} catch (error) {
			console.log('err');
		}
	}
	function handleContentChange(data) {
		verifyUser();
		current_data.update((cur) => {
			// console.log(cur);
			return { ...cur, code: data };
		});
		handleAutoSave();
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
				rules: [],
				colors: {
					'editor.foreground': '#f4eded',
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
			editor = monacoModel.editor.create(editorContanier, editorConfig);

			setEditorTheme();
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
					monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS // Ctrl + S
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

			editor.addAction(saveAction);
		});

		window.addEventListener('resize', () => {
			if (editor) {
				editor.layout();
			}
		});
		loading = false;
	});

	afterUpdate(() => {
		setEditorTheme();
	});
</script>

{#if loading}
	<div class="flex h-full items-center justify-center">
		<Fa icon={faSpinner} class="animate-spin text-2xl" />
	</div>
{:else}
	<div class="editor-container h-full rounded-xl">
		<div
			class="h-full w-full rounded-xl bg-white p-6 dark:bg-primary"
			bind:this={editorContanier}
		/>
	</div>
{/if}

<style>
	/* Set the height of the editor container */
	.editor-container {
		height: 100%;
		width: 100%;
	}
</style>
